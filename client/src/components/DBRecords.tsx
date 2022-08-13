import { useEffect, useState } from "react";
import Button from "./Button";

const DBRecords = () => {
  const [records, setRecords] = useState<{
    data: {
      data: string[];
      count: number;
    }[];
  }>();

  useEffect(() => {
    // Get records on page load.
    getRecords();

    // Get records every 5s.
    const interval = setInterval(() => {
      getRecords();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get records from the Web Storage.
  const getRecords = () => {
    // localStorage.setItem(
    //   "data",
    //   JSON.stringify({
    //     data: [
    //       {
    //         data: ["Lorem ipsum."],
    //         count: 0,
    //       },
    //       {
    //         data: ["Lorem ipsum", "dolor sit amet."],
    //         count: 0,
    //       },
    //     ],
    //   })
    // );

    setRecords(JSON.parse(localStorage.getItem("data") as string));
  };

  return (
    <div className="db-records-container">
      <h3>Records</h3>
      <Button
        variant="regular"
        text="Import JSON"
        action={() => console.log("Import json")}
      />
      <div className="db-records">
        {records
          ? records["data"].map((item, key) => {
              return (
                <div className="db-record" key={key}>
                  <div className="db-top">
                    <textarea
                      className="db-record-text"
                      readOnly
                      value={item.data.join("\n")}
                    ></textarea>
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
            })
          : "There are no records."}
      </div>
    </div>
  );
};

export default DBRecords;
