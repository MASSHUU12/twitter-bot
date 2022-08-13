import axios from "axios";
import DBRecords from "../components/DBRecords";
import Toggle from "../components/Toggle";

const Dashboard = () => {
  // Toggle bot.
  const toggleBot = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/toggle",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="btn-toggle-section">
        <Toggle title="Start bot" toggleTitle="Stop bot" action={toggleBot} />
      </div>
      <DBRecords />
    </div>
  );
};

export default Dashboard;
