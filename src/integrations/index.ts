import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

export const gqlClient = new ApolloClient({
  uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
  cache: new InMemoryCache(),
});

export const FETCH_MORE_MESSAGES = gql`
  query fetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const FETCH_LATEST_MESSAGES = gql`
  query fetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation postMessage(
    $channelId: String!
    $message: String!
    $userId: String!
  ) {
    postMessage(channelId: $channelId, text: $message, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;
