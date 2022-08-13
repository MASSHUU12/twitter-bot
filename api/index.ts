import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { TwitterApi } from "twitter-api-v2";
import { saveAuth } from "./src/utils/saveAuth.js";
import { getAuth } from "./src/utils/getAuth.js";
import { setTokens } from "./src/utils/setTokens.js";
import { postTweet } from "./src/utils/postTweet.js";
import { getQuotes } from "./src/utils/getQuotes.js";

// Import .env file.
dotenv.config();

// TODO: Validate .env.

// Create TwitterApi object needed for OAuth2.
const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID as string,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

// Set it as readonly.
const client = twitterClient.readOnly;

// Create Express web server.
const app: Express = express();
const port = 8000;

// Enable all CORS requests.
app.use(cors());

/**
 *| Routes.
 */

// Redirect to React app.
app.get("/", (req: Request, res: Response) => {
  res.send("Hello.");
  //res.redirect("http://127.0.0.1:3000/");
});

// Authenticate user.
app.get("/auth", async (req: Request, res: Response) => {
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
    process.env.TWITTER_CALLBACK_URL as string,
    { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
  );

  // Send data to database.
  saveAuth(codeVerifier, state);

  // Redirect to authorization.
  res.redirect(url);
});

// Twitter callback.
app.get("/callback", async (req, res) => {
  const { state, code } = req.query;
  const { codeVerifier, state: storedState } = await getAuth();

  if (state !== storedState)
    res.status(404).send("Stored tokens do not match.");

  // Login
  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await client.loginWithOAuth2({
    code: code as string,
    codeVerifier: codeVerifier,
    redirectUri: process.env.TWITTER_CALLBACK_URL as string,
  });

  // Store tokens.
  setTokens(accessToken, refreshToken as string);

  res.redirect("http://127.0.0.1:3000/dashboard");
});

// Toggle bot.
let working = false;
let interval: NodeJS.Timer;

app.get("/toggle", (req: Request, res: Response) => {
  working = !working;

  if (working)
    interval = setInterval(
      postTweet,
      process.env.BOT_DELAY ? parseInt(process.env.BOT_DELAY) : 10000
    );

  if (!working) clearInterval(interval);

  res.send(working);
});

// Get quotes.
app.get("/quotes", async (req: Request, res: Response) => {
  res.json(await getQuotes());
});

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json("Oh noes!");
});

// Run web server.
app.listen(port, () => {
  console.log(`[server]:⚡️ Server is running at http://127.0.0.1:${port}.`);
});
