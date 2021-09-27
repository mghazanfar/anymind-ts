import React from "react";
import { MessageLeft } from "./message-left";
import { MessageRight, RetryArguments } from "./message-right";

const users = [
  {
    name: "Joyse",
    img: "https://www.hachettebookgroup.com/wp-content/uploads/2017/06/img-video-placeholder-2.jpg?resize=420%2C580",
  },
  {
    name: "Russell",
    img: "https://yt3.ggpht.com/bJvqkDptj4hg7X96zkO2A5wsre31JMevAEyIPXqvYZs5_sdSdmdY-gguLiiBgMwzW72kQ69Y=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Sam",
    img: "https://assets.teenvogue.com/photos/5d7bc0eaeb2d250008cbc09b/2:3/w_2110,h_3165,c_limit/sam-tout.jpg",
  },
  {
    name: "404",
    img: "https://observer.com/wp-content/uploads/sites/2/2020/11/Screen-Shot-2020-11-19-at-10.24.58-AM.png?w=635",
  },
];

interface IChatItem {
sent: boolean;
userId: string;
text: string;
datetime: string;
messageId: string;
channel: string;
retry: ({ channelId, userId, text }: RetryArguments) => void;
}

export const ChatItem = ({ sent, ...rest }: IChatItem) => {
  let img = users.find((item) => item.name === rest.userId)
    ? users.find((item) => item.name === rest.userId)!.img
    : users[3].img;
  return sent ? (
    <MessageRight {...rest} img={img} />
  ) : (
    <MessageLeft {...rest} img={img} />
  );
};
