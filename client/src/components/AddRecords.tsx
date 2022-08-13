import { useState } from "react";
import Button from "./Button";

/**
 * Add record to database.
 *
 * @returns void
 */
const AddRecords = () => {
  const [value, setValue] = useState("");

  const addRecord = () => {
    const records = JSON.parse(localStorage.getItem("data") as string);

    records["data"].push({
      data: value.split("\n"),
      count: 0,
    });

    localStorage.setItem("data", JSON.stringify(records));

    setValue("");
  };

  return (
    <div className="add-records-container">
      <textarea
        minLength={1}
        maxLength={512}
        placeholder="Lorem ipsum dolor sit amet."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <Button variant="regular" text="Add record" action={() => addRecord()} />
    </div>
  );
};

export default AddRecords;
