import { getJSON } from "./getJSON.js";

export const postTweet = async () => {
  const quotes = await getJSON("quotes");
  let quote: string;

  // const { refreshToken } = await getTokens();

  // // Refresh tokens.
  // const {
  //   client: refreshedClient,
  //   accessToken,
  //   refreshToken: newRefreshToken,
  // } = await client.refreshOAuth2Token(refreshToken);

  // // Set new tokens.
  // setTokens(accessToken, newRefreshToken as string);

  // await refreshedClient.v2
  //   .tweet("@WitcherQuotesPL")
  //   .then(() => res.send("Yes"))
  //   .catch((err) => res.send(err));
};
