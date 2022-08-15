import { useState } from "react";
import Button from "../../../components/Button";
import { addRecord } from "../../../helpers/records/addRecord";

/**
 * Add record to database.
 *
 * @returns JSX.Element
 */
const AddRecords = (): JSX.Element => {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(0);

  /**
   * Handles add record button.
   *
   * @returns void
   */
  const handleAddBtn = (): void => {
    // If textarea is empty, do nothing.
    if (value.length < 1) return;

    // Add record.
    addRecord(value);

    // Reset textarea.
    setValue("");
    setLength(0);
  };

  return (
    <div className="add-records-container">
      <div className="textarea-container">
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
      <Button
        variant="regular"
        text="Add record"
        action={() => handleAddBtn()}
      />
    </div>
  );
};

export default AddRecords;
