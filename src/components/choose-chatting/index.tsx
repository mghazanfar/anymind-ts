import React from "react";
import { Box } from "@mui/system";
import { ChooseUser } from "../choose-user";
import { ChooseChannel } from "../choose-channel";
import { useStyles } from "../../styles";
import { ChooseChatWallpaper } from "../choose-chat-wallpaper";
import { IChatContext } from "../../store/chat-context";

export const ChooseChatting = ({ chat, changeChat }: IChatContext) => {
  const classes = useStyles();
  return (
    <Box p={3} pt={0} mt={8}>
      <ChooseUser />
      <ChooseChannel />
      <ChooseChatWallpaper
        onWallpaperChange={(wallpaper: string) => changeChat({ ...chat, wallpaper })}
        classes={classes}
      />
    </Box>
  );
};
