import React from "react";
import { Avatar, Box, ButtonBase, Paper, Tooltip } from "@mui/material";
import { useMessageStyles } from "../style";
import moment from "moment";
import { Error } from "@mui/icons-material";
import { IMessage } from "../message-right";

export const MessageLeft = (props: IMessage) => {
  const message = props.text ? props.text : "no message";
  const timestamp = props.datetime ? moment(props.datetime).fromNow() : "";
  const photoURL = props.img;
  const displayName = props.userId ? props.userId : "----";
  const classes = useMessageStyles();
  return (
    <>
      <div className={classes.messageRow}>
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
          <Avatar
            alt={displayName}
            className={classes.orange}
            src={photoURL}
          ></Avatar>
          <div className={classes.displayName}>{displayName}</div>
        </Box>
        <div>
          <Paper className={classes.messageBlue} elevation={11}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </Paper>
        </div>
      </div>
    </>
  );
};
