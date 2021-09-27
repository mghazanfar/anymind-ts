import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Box } from "@mui/system";
import { ArrowDownwardTwoTone, ArrowUpwardTwoTone } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { ChatItem } from "../chat-item";
import {
  FETCH_LATEST_MESSAGES,
  FETCH_MORE_MESSAGES,
  POST_MESSAGE,
} from "../../integrations";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useStyles } from "../../styles";
import { IChat } from "../../store/chat-context";
import { IMessage, RetryArguments } from "../chat-item/message-right";

const channels = ["General", "Technology", "LGTM"];

interface IChatHistory {
  chat:  IChat
}

export const ChatHistory = ({ chat }: IChatHistory) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    let container = document.getElementById("chat-container");
    if (!loadingMore) {
      setTimeout(() => (container!.scrollTop = container!.scrollHeight), 200);
    }
  };

  const classes = useStyles();
  let hasWallpaper = chat!.wallpaper.length > 0;

  const [sendMessage, { loading: sending }] = useMutation(POST_MESSAGE);

  const [
    getLatestMessages,
    { loading: loadingLatestMessages, data: latestMessages },
  ] = useLazyQuery(FETCH_LATEST_MESSAGES);

  const [getMessages, { loading, data }] = useLazyQuery(FETCH_MORE_MESSAGES);

  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [loadingMore, setLoadingMore] = useState(false);
  const [messagesData, setMessagesData] = useState<IMessage[]>([]);

  useEffect(() => {
    if (chat.user && chat.channel) {
      getLatestMessages({ variables: { channelId: chat.channel } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  useEffect(() => {
    let messages = messagesData;

    if (data && data.fetchMoreMessages && data.fetchMoreMessages.length > 0) {
      messages = messages.concat(data.fetchMoreMessages);
    } else if (
      latestMessages &&
      latestMessages.fetchLatestMessages &&
      latestMessages.fetchLatestMessages.length > 0
    ) {
      messages = messages.concat(latestMessages.fetchLatestMessages);
    }
    messages = messages.sort((a, b) => {
      if (a!.datetime > b!.datetime) return 1;
      if (a!.datetime < b!.datetime) return -1;
      return 0;
    });
    setMessagesData([...messages]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestMessages, data]);

  useEffect(() => {
    setMessagesData([]);
  }, [chat.channel]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(scrollToBottom, [messagesData]);

  const postMessage = ({ channelId, userId, text }: RetryArguments) => {
    sendMessage({ variables: { channelId, message: text || message, userId } })
      .then(({ data }) => {
        let withPostedMessage = [...messagesData, data.postMessage];
        let failedMessages = withPostedMessage.filter(
          (item) => item.messageId === "failed"
        );
        if (
          failedMessages.length > 0 &&
          failedMessages.some((item) => item.text === data.postMessage.text)
        ) {
          withPostedMessage = withPostedMessage.filter(
            (item) => item.messageId !== "failed"
          );
        }
        setMessagesData(withPostedMessage);
        setMessage("");
        localStorage.setItem("message", "");
      })
      .catch((e) => {
        let failedMessage = {
          datetime: new Date(Date.now()),
          messageId: "failed",
          text: message,
          userId: chat.user,
        };
        let withPostedMessage = [...messagesData, failedMessage];
        setMessagesData(withPostedMessage as IMessage[]);
      });
  };

  const handleFetchMore = () => {
    setLoadingMore(true);
    document!.getElementById("chat-container")!.scrollTo(0, 0);
    getMessages({
      variables: {
        channelId: chat.channel,
        messageId: messagesData[0].messageId,
        old: true,
      },
    });
  };

  let container = document.getElementById("chat-container");
  return (
    <>
      <Box
        borderRadius="7px"
        border="1px solid lightgrey"
        p={1}
        ml={2}
        mb={3}
        className={hasWallpaper ? classes.chatWallpaper : ""}
        style={{ backgroundImage: `url(${chat.wallpaper})` }}
        position="relative"
        boxShadow="0px 6px 7px -4px rgb(0 0 0 / 20%), 0px 11px 15px 1px rgb(0 0 0 / 14%), 0px 4px 20px 3px rgb(0 0 0 / 12%)"
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgcolor="rgb(255 255 255 / 21%)"
        />
        <h3 style={{ color: hasWallpaper ? "aliceblue" : "black" }}>
          {channels[Number(chat.channel) - 1] || "Please choose options from left"}
        </h3>
        <Divider style={{ backgroundColor: hasWallpaper ? "aliceblue" : "" }} />
        <Box
          p={2}
          height="53vh"
          overflow="auto"
          position="relative"
          id={"chat-container"}
        >
          {loading || loadingLatestMessages ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <CircularProgress size="80px" />
              <Box mt={3}>Fetching messages...</Box>
            </Box>
          ) : null}

          {chat.channel && chat.user && messagesData.length > 0 && (
            <>
              <IconButton
                className={classes.upButton}
                onClick={() => handleFetchMore()}
                size="small"
                disabled={
                  (data && data.fetchMoreMessages.length === 0) || loading
                }
              >
                <ArrowUpwardTwoTone />
              </IconButton>
            </>
          )}

          {messagesData &&
            messagesData.length > 0 &&
            messagesData.map((message) => (
              <ChatItem
                {...message}
                sent={message.userId === chat.user}
                channel={chat.channel}
                retry={postMessage}
                key={message.messageId}
              />
            ))}
          <div ref={messagesEndRef} />
          {chat.channel && chat.user && messagesData.length > 0 && (
            <IconButton
              className={classes.downButton}
              onClick={() => {
                container!.scrollTop = container!.scrollHeight;
              }}
              size="small"
            >
              <ArrowDownwardTwoTone />
            </IconButton>
          )}
        </Box>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postMessage({ channelId: chat.channel, userId: chat.user });
        }}
      >
        <Box ml={2} display="flex">
          <TextField
            id="outlined-basic"
            label="Type Message"
            variant="outlined"
            fullWidth
            style={{ marginRight: 16 }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              localStorage.setItem("message", e.target.value);
            }}
          />
          <Button
            disabled={message.length === 0 || !chat.user || !chat.channel}
            variant="contained"
            type="submit"
          >
            <Box>Send </Box>
            <Box>
              {" "}
              {sending && (
                <CircularProgress style={{ marginLeft: 24, color: "white" }} />
              )}{" "}
            </Box>
          </Button>
        </Box>
      </form>
    </>
  );
};
