import { useRef, useState } from "react";
import AddRecords from "./components/AddRecords";
import DBRecords from "./components/DBRecords";
import Toggle from "../../components/Toggle";
import { getRecord } from "../../helpers/records/getRecord";
import Axios from "../../helpers/axios";
import env from "react-dotenv";
import "../../style/dashboard.scss";

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
      interval.current = setInterval(() => tweet(), 1000);
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
   * Call server to post tweet.
   *
   * @return void
   */
  const tweet = (): void => {
    seconds.current++;

    // Update time on dashboard.
    setDSeconds(seconds.current);

    if (seconds.current >= time) {
      seconds.current = 0;

      // Call an API.
      Axios.request({
        url: "/tweet",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { data: getRecord().data },
      })
        .then(() => console.log("Send"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="toggle-bot-section">
        <Toggle title="Start bot" toggleTitle="Stop bot" action={toggleBot} />
        <p>{`${dSeconds}/${time}`}s</p>
      </div>
      <AddRecords />
      <DBRecords />
    </div>
  );
};

export default Dashboard;
