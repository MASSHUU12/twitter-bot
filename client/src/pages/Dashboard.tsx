import { useRef, useState } from "react";
import AddRecords from "../components/AddRecords";
import DBRecords from "../components/DBRecords";
import Toggle from "../components/Toggle";
import { getRecord } from "../helpers/getRecord";
// import Axios from "../helpers/axios";

const Dashboard = () => {
  const interval = useRef<null | NodeJS.Timer>(null);
  const [dSeconds, setDSeconds] = useState(0);
  const seconds = useRef(0);
  const time = process.env.BOT_DELAY ? parseInt(process.env.BOT_DELAY) : 86400;

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
    // Axios.post("/tweet")
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));

    seconds.current++;
    setDSeconds(seconds.current);

    if (seconds.current >= time) {
      seconds.current = 0;
      console.log(getRecord().data);
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
