import { useState } from "react";
import Button from "./Button";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editOff } from "../features/editSlice";
import { updateRecords } from "../helpers/updateRecords";

/**
 * Update records in database.
 */
const UpdateScreen = () => {
  const { index, text: t } = useAppSelector((state) => state.edit);
  const dispatch = useAppDispatch();

  const [text, setText] = useState(t);
  const [length, setLength] = useState(0);

  return (
    <div className="update-screen-container">
      <div className="update-screen">
        <Icon
          icon="ep:close-bold"
          width="32"
          onClick={() => dispatch(editOff())}
        />
        <div className="update-screen-inputarea">
          <textarea
            minLength={1}
            maxLength={512}
            placeholder="Lorem ipsum dolor sit amet."
            value={text}
            onChange={(e) => {
              setLength(e.target.value.length);
              setText(e.target.value);
            }}
          ></textarea>
          <span>{length}/512</span>
        </div>
        <Button
          variant="regular"
          text="Update record"
          action={() => updateRecords(text, index)}
        />
      </div>
    </div>
  );
};

export default UpdateScreen;
