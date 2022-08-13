import dotenv from "dotenv";

dotenv.config();

/**
 * Validate .env file.
 *
 * @returns number
 */
const validateEnv = (): number => {
  const {
    TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET,
    TWITTER_CALLBACK_URL,
    BOT_DELAY,
  } = process.env;

  if (
    !TWITTER_CLIENT_ID ||
    !TWITTER_CLIENT_SECRET ||
    !TWITTER_CALLBACK_URL ||
    !BOT_DELAY
  )
    throw new Error("Missing .env variables.");
  return 0;
};

export default validateEnv;
