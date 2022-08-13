import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = 9000;

// Enable all CORS requests.
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi");
});

app.get("/auth", (req: Request, res: Response) => {
  res.redirect("http://127.0.0.1:3000/?dashboard");
});

app.listen(port, () => {
  console.log(`🔥 [server]: Server is running at http://127.0.0.1:${port}.`);
});

// Authenticate user.
// const generateLink = () => {
// Create TwitterApi object needed for OAuth2.
// const twitterClient = new TwitterApi({
//   clientId: process.env.TWITTER_CLIENT_ID as string,
//   clientSecret: process.env.TWITTER_CLIENT_SECRET,
// });

// Set it as readonly.
// const client = twitterClient.readOnly;

// const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
//   process.env.TWITTER_CALLBACK_URL as string,
//   { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
// );

// Save data in database.
// saveAuth(codeVerifier, state);

// Redirect.
//   window.location.href = url;
// };
