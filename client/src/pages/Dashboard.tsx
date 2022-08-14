import { useRef } from "react";
import AddRecords from "../components/AddRecords";
import DBRecords from "../components/DBRecords";
import Toggle from "../components/Toggle";
import { getRecord } from "../helpers/getRecord";
// import Axios from "../helpers/axios";

const Dashboard = () => {
  const interval = useRef<null | NodeJS.Timer>(null);

  // Toggle bot.
  const toggleBot = () => {
    if (interval.current === null) {
      tweet();
      interval.current = setInterval(() => tweet(), 1000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  // Call server to post tweet.
  const tweet = () => {
    // Axios.post("/tweet")
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));

    console.log(getRecord().data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="btn-toggle-section">
        <Toggle title="Start bot" toggleTitle="Stop bot" action={toggleBot} />
      </div>
      <AddRecords />
      <DBRecords />
    </div>
  );
};

export default Dashboard;
