import React from "react";
import { ButtonBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { ChatContext } from "../../store/chat-context";

const chatBackgrounds = [
  "https://cdn.wallpaperhub.app/cloudcache/1/b/5/8/e/f/1b58ef6e3d36a42e01992accf5c52d6eea244353.jpg",
  "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?size=626&ext=jpg",
  "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1500",
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg",
  "https://www.androidguys.com/wp-content/uploads/2015/12/Wave-Wallpapers-1.jpg",
  "",
];

export interface IChooseChatWallpaperItem {
  bgImage: string;
  onWallpaperChange: (img: string) => void;
  className: string;
}

export interface IChooseChatWallpaper {
  onWallpaperChange: (img: string) => void;
  classes: any;
}

export const ChooseChatWallpaperItem = ({
  bgImage,
  onWallpaperChange,
  className,
}: IChooseChatWallpaperItem) => {
  return (
    <ChatContext.Consumer>
      {({ chat }) => {
        let isSelected = bgImage === chat.wallpaper;
        return (
          <Paper
            onClick={() => onWallpaperChange(bgImage)}
            style={{
              backgroundImage: `url(${bgImage})`,
              borderColor: isSelected ? "rgb(69 137 185)" : "",
            }}
            className={className}
            elevation={11}
          >
            <ButtonBase className={className} />
          </Paper>
        );
      }}
    </ChatContext.Consumer>
  );
};

export const ChooseChatWallpaper = ({ onWallpaperChange, classes }: IChooseChatWallpaper) => {
  return (
    <>
      <Box mt={3}>Choose a chat wallpaper</Box>
      <Box display="flex" flexWrap="wrap">
        {chatBackgrounds.map((bg, i) => (
          <ChooseChatWallpaperItem
            bgImage={bg}
            onWallpaperChange={onWallpaperChange}
            className={classes.wallpaperItem}
            key={bg + i}
          />
        ))}
      </Box>
    </>
  );
};
