import AddRecords from "../components/AddRecords";
import DBRecords from "../components/DBRecords";
import Toggle from "../components/Toggle";
import Axios from "../helpers/axios";

const Dashboard = () => {
  // Toggle bot.
  const toggleBot = () => {
    Axios.get("/toggle")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
