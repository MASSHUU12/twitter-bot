import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { TwitterApi } from "twitter-api-v2";
import { postTweet } from "./src/utils/postTweet.js";
import { getJSON } from "./src/utils/getJSON.js";
import { saveJSON } from "./src/utils/saveJSON.js";
import validateEnv from "./src/utils/validateEnv.js";

// Import .env file.
dotenv.config();

// Validate .env.
validateEnv();

// Create TwitterApi object needed for OAuth2.
const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID as string,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

// Set it as readonly.
const client = twitterClient.readOnly;

// Create Express web server.
const app: Express = express();

// Enable all CORS requests.
app.use(cors());

// Parsing application/json
app.use(express.json());

// Parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * Redirect to React app.
 */
app.get("/", (req: Request, res: Response) => {
  res.redirect("http://127.0.0.1:3000/");
});

/**
 * Authenticate user.
 */
app.get("/auth", async (req: Request, res: Response) => {
  const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
    process.env.TWITTER_CALLBACK_URL as string,
    { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
  );

  // Send data to database.
  saveJSON("auth", {
    codeVerifier: codeVerifier,
    state: state,
  });

  // Redirect to authorization.
  res.redirect(url);
});

/**
 * Twitter callback.
 */
app.get("/callback", async (req, res) => {
  const { state, code } = req.query;
  const { codeVerifier, state: storedState } = await getJSON("auth");

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
  saveJSON("tokens", {
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  res.redirect("http://127.0.0.1:3000/dashboard");
});

/**
 * Post tweet.
 */
app.post("/tweet", (req: Request, res: Response) => {
  postTweet(client, req.body.data);
});

/**
 * 404 route.
 */
app.use((req: Request, res: Response) => {
  res.status(404).json("Oh noes!");
});

/**
 * Run web server.
 */
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `[server]:⚡️ Server is running at http://127.0.0.1:${process.env.SERVER_PORT}.`
  );
});
