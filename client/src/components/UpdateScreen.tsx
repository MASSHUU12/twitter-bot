import { useState } from "react";
import Button from "./Button";
import { Icon } from "@iconify/react";
import { useAppDispatch } from "../app/hooks";
import { toggle } from "../features/editSlice";

/**
 * Update records in database.
 */
const UpdateScreen = () => {
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const dispatch = useAppDispatch();

  return (
    <div className="update-screen-container">
      <div className="update-screen">
        <Icon
          icon="ep:close-bold"
          width="32"
          onClick={() => dispatch(toggle())}
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
          action={() => console.log("update")}
        />
      </div>
    </div>
  );
};

export default UpdateScreen;
