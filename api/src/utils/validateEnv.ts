import dotenv from "dotenv";

dotenv.config();

/**
 * Env validation.
 *
 * @returns number
 */
const validateEnv = (): number => {
  const { TWITTER_BEARER_TOKEN, BOT_DELAY, TWITTER_CALLBACK_URL } = process.env;

  if (!TWITTER_BEARER_TOKEN || !BOT_DELAY || !TWITTER_CALLBACK_URL)
    throw new Error("Missing .env variables.");
  return 0;
};

export default validateEnv;
