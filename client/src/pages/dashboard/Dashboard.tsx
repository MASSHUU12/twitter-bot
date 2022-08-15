import { useRef, useState } from "react";
import AddRecords from "./components/AddRecords";
import DBRecords from "./components/DBRecords";
import Toggle from "../../components/Toggle";
import env from "react-dotenv";
import "../../style/dashboard.scss";
import Button from "../../components/Button";
import { tweet } from "../../helpers/tweet";

/**
 * Dashboard page.
 *
 * @returns JSX.Element
 */
const Dashboard = (): JSX.Element => {
  const interval = useRef<null | NodeJS.Timer>(null);
  const [dSeconds, setDSeconds] = useState(0);
  const seconds = useRef(0);
  const time = env.BOT_DELAY ? parseInt(env.BOT_DELAY) : 86400;

  /**
   * Toggle bot.
   *
   * @returns void
   */
  const toggleBot = (): void => {
    // If interval is not running, create new.
    if (interval.current === null)
      interval.current = setInterval(() => callServer(), 1000);
    else {
      // If interval is running, clear it.
      clearInterval(interval.current);
      interval.current = null;

      // Reset seconds
      seconds.current = 0;
      setDSeconds(seconds.current);
    }
  };

  /**
   * Manage working bot.
   *
   * @return void
   */
  const callServer = (): void => {
    seconds.current++;

    // Update time on dashboard.
    setDSeconds(seconds.current);

    if (seconds.current >= time) {
      seconds.current = 0;

      // Post tweet.
      tweet();
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="toggle-bot-section">
          <div className="toggle-bot-run">
            {/* Toggle bot */}
            <Toggle
              title="Start bot"
              toggleTitle="Stop bot"
              action={toggleBot}
            />
            <p>{`${dSeconds}/${time}`}s</p>
          </div>
          {/* Run bot once */}
          <Button variant="regular" text="Run once" action={() => tweet()} />
        </div>
        <AddRecords />
        <DBRecords />
      </div>
    </>
  );
};

export default Dashboard;
