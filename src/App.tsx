import React, { useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import { ChooseChatting } from "./components/choose-chatting";
import { ChatHistory } from "./components/chat-history";
import { IChat, ChatContext } from "./store/chat-context";
import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "./integrations";
import { useStyles } from "./styles";


function App() {
  const [chat, setChat] = useState<IChat>({ channel: "", user: "", wallpaper: "" });
  const classes = useStyles();

  const changeChat = (detail: IChat) => {
    setChat(detail);
  };

  return (
    <ApolloProvider client={gqlClient}>
      <ChatContext.Provider value={{ chat, changeChat }}>
        <Box className={classes.root}>
          <Grid container justifyContent="center" minHeight="100vh">
            <Grid item xs={12} lg={10} p={4} display="flex" width="100%">
              <Paper elevation={24} className={classes.paperContainer}>
                <Grid container p={2}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    lg={4}
                    borderRight="1px solid lightgrey"
                  >
                    <ChooseChatting chat={chat} changeChat={changeChat} />
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} lg={8}>
                    <ChatHistory chat={chat} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </ChatContext.Provider>
    </ApolloProvider>
  );
}

export default App;
