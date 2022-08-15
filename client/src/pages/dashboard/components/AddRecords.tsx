import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { editRecords } from "../../../features/recordsSlice";
import Button from "../../../components/Button";

/**
 * Add record to database.
 *
 * @returns void
 */
const AddRecords = () => {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(0);
  const dispath = useAppDispatch();

  const addRecord = () => {
    if (value.length < 1) return;

    const records = JSON.parse(localStorage.getItem("data") as string);

    records["data"].push({
      data: value.split("\n"),
      count: 0,
    });

    // Update records in Web Storage and Redux.
    localStorage.setItem("data", JSON.stringify(records));
    dispath(editRecords(records));

    setValue("");
    setLength(0);
  };

  return (
    <div className="add-records-container">
      <div className="add-records-inputarea">
        <textarea
          minLength={1}
          maxLength={512}
          placeholder="Lorem ipsum dolor sit amet."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setLength(e.target.value.length);
          }}
        ></textarea>
        <span>{length}/512</span>
      </div>
      <Button variant="regular" text="Add record" action={() => addRecord()} />
    </div>
  );
};

export default AddRecords;
