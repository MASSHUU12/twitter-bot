import { useRef, useState } from "react";
import AddRecords from "../components/AddRecords";
import DBRecords from "../components/DBRecords";
import Toggle from "../components/Toggle";
import { getRecord } from "../helpers/getRecord";
import Axios from "../helpers/axios";
import env from "react-dotenv";

const Dashboard = () => {
  const interval = useRef<null | NodeJS.Timer>(null);
  const [dSeconds, setDSeconds] = useState(0);
  const seconds = useRef(0);
  const time = env.BOT_DELAY ? parseInt(env.BOT_DELAY) : 86400;

  // Toggle bot.
  const toggleBot = () => {
    if (interval.current === null)
      interval.current = setInterval(() => tweet(), 1000);
    else {
      clearInterval(interval.current);
      interval.current = null;
      seconds.current = 0;
      setDSeconds(seconds.current);
    }
  };

  // Call server to post tweet.
  const tweet = () => {
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
    <div>
      <h1>Dashboard</h1>
      <div className="btn-toggle-section">
        <Toggle title="Start bot" toggleTitle="Stop bot" action={toggleBot} />
        <p>{`${dSeconds}/${time}`}</p>
      </div>
      <AddRecords />
      <DBRecords />
    </div>
  );
};

export default Dashboard;
