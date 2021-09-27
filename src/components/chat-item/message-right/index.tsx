import React from "react";
import { Avatar, ButtonBase, Paper, Tooltip } from "@mui/material";
import { useMessageStyles } from "../style";
import { Box } from "@mui/system";
import moment from "moment";
import { Error } from "@mui/icons-material";

export interface RetryArguments {
  channelId: string;
  userId: string;
  text?: string;
}

export interface IMessage {
  img: string;
  userId: string;
  text: string;
  datetime: string;
  messageId: string;
  channel: string;
  retry: ({ channelId, userId, text }: RetryArguments) => void;
}

export const MessageRight = (props: IMessage) => {
  const message = props.text ? props.text : "no message";
  const timestamp = props.datetime ? moment(props.datetime).fromNow() : "";
  const photoURL = props.img;
  const displayName = props.userId ? props.userId : "----";
  const classes = useMessageStyles();

  return (
    <>
      <Box className={classes.messageRow} flexDirection="row-reverse" mb={2}>
        {props.messageId === "failed" && (
          <Tooltip title="Could not send. Click to retry!">
            <ButtonBase
              onClick={() =>
                props.retry({
                  channelId: props.channel,
                  userId: props.userId,
                  text: message,
                })
              }
              style={{ borderRadius: "50%", height: "100%" }}
            >
              <Error style={{ color: "tomato" }} />
            </ButtonBase>
          </Tooltip>
        )}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar alt={displayName} className={classes.orange} src={photoURL} />
          <div className={classes.displayName}>{displayName}</div>
        </Box>
        <div>
          <Paper className={classes.messageOrange} elevation={11}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </Paper>
        </div>
      </Box>
    </>
  );
};
