import { TwitterApiReadOnly } from "twitter-api-v2";
import { getJSON } from "./getJSON.js";
import { saveJSON } from "./saveJSON.js";

export const postTweet = async (
  client: TwitterApiReadOnly,
  message: string[]
) => {
  const { refreshToken } = await getJSON("tokens");

  // Refresh tokens.
  const {
    client: refreshedClient,
    accessToken,
    refreshToken: newRefreshToken,
  } = await client.refreshOAuth2Token(refreshToken);

  // Set new tokens.
  saveJSON("tokens", {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });

  await refreshedClient.v2
    .tweet(message.join("\n"))
    .then(() => console.log("Tweet posted."))
    .catch((err) => console.log(err));
};
