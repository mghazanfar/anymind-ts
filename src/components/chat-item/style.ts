import { createStyles, makeStyles } from "@mui/styles";
import { deepOrange } from "@mui/material/colors";

export const useMessageStyles = makeStyles(() =>
  createStyles({
    messageRow: {
      display: "flex",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      width: "",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      borderRadius: "10px",
      border: "1px solid lightgrey",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid white",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid lightgrey",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px",
      },
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      width: "",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      borderRadius: "10px",
      border: "1px solid lightgrey",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid white",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px",
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid lightgrey",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px",
      },
    },

    messageContent: {
      padding: 0,
      margin: 0,
    },
    messageTimeStampRight: {
      fontSize: ".85em",
      fontWeight: 300,
      marginTop: "10px",
    },

    orange: {
      color: "white",
      backgroundColor: deepOrange[500],
      width: "60px !important",
      height: "60px !important",
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: 32,
      height: 32,
    },
    displayName: {
      maxWidth: 50,
    },
  })
);
