import { useState } from "react";
import Button from "../../../components/Button";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { editOff } from "../../../features/editSlice";
import { updateRecords } from "../../../helpers/records/updateRecords";
import "../../../style/updateScreen.scss";

/**
 * Update records in database.
 *
 * @returns JSX.Element
 */
const UpdateScreen = (): JSX.Element => {
  // Get info about record to edit.
  const { index, text: t } = useAppSelector((state) => state.edit);
  const dispatch = useAppDispatch();

  const [text, setText] = useState(t);
  const [length, setLength] = useState(0);

  return (
    <div className="update-screen-container">
      <div className="update-screen">
        {/* Close icon */}
        <Icon
          icon="ep:close-bold"
          width="32"
          onClick={() => dispatch(editOff())}
        />
        <div className="update-screen-inputarea textarea-container">
          {/* Textarea */}
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
        {/* Button */}
        <Button
          variant="regular"
          text="Update record"
          action={() => {
            updateRecords(text, index);
            dispatch(editOff());
          }}
        />
      </div>
    </div>
  );
};

export default UpdateScreen;
