import { useEffect, useState } from "react";
import Axios from "../helpers/axios";
import Button from "./Button";

const DBRecords = () => {
  const [records, setRecords] = useState<
    {
      quote: string;
      count: number;
    }[]
  >();

  useEffect(() => {
    // Get quotes on page load.
    getRecords();

    // Get quotes from the server every 5s.
    const interval = setInterval(() => {
      getRecords();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get quotes from the server.
  const getRecords = () => {
    Axios.get("/quotes").then((res) => {
      setRecords(res.data);
    });
  };

  return (
    <div className="db-records-container">
      <h3>Records</h3>
      <div className="db-records">
        {records?.map((item, key) => {
          return (
            <div className="db-record" key={key}>
              <div className="db-top">
                <p className="db-record-text">
                  <span>Text: </span>
                  {item.quote}
                </p>
                <p className="db-record-counter">
                  <span>Count: </span>
                  {item.count}
                </p>
              </div>
              <div className="db-btm">
                <Button
                  variant="regular"
                  text="Edit record"
                  action={() => console.log("Edit")}
                />
                <Button
                  variant="error"
                  text="Delete record"
                  action={() => console.log("Delete")}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DBRecords;
