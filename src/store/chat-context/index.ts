import React from "react";

export interface IChat {
  channel: string;
  user: string;
  wallpaper: string;
}

export interface IChatContext {
  chat: IChat;
  changeChat: (detail: IChat) => void
}

export const ChatContext = React.createContext<IChatContext>({
  chat: { channel: "", user: "", wallpaper: "" },
  changeChat: (detail: IChat) => {},
});
