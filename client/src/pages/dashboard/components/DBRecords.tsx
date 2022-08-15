import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { editRecords } from "../../../features/recordsSlice";
import { deleteRecord } from "../../../helpers/records/deleteRecord";
import { importRecords } from "../../../helpers/records/importRecords";
import Button from "../../../components/Button";
import { updateRecords } from "../../../helpers/records/updateRecords";
import "../../../style/dbRecords.scss";

/**
 * Manages database records.
 *
 * @returns JSX.Element
 */
const DBRecords = (): JSX.Element => {
  // Holds records from Redux.
  const records = useAppSelector((state) => state.records.value);
  const dispatch = useAppDispatch();

  // Reference for file input.
  const fileRef = useRef<any>(null);

  /**
   * Opens file dialog.
   *
   * @returns void
   */
  const openFileDialog = (): void => {
    // If something is wrong do nothing.
    if (fileRef.current instanceof HTMLElement !== true) return;

    // Open file dialog.
    fileRef.current.click();
  };

  /**
   * Handles file input.
   *
   * @param e React.ChangeEvent<HTMLInputElement>
   * @returns Promise<void>
   */
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if file exists.
    if (e.target.files![0] === null) return;

    // Get file info.
    const f = e.target.files!.item(0);

    // Check if file too large.
    if (f!.size > 500000000) {
      console.error("File too large.");
      return;
    }

    // Read file.
    const reader = await f!.text();

    // Import file.
    importRecords(reader);
  };

  useEffect(() => {
    // Get records every time they change.
    dispatch(editRecords(JSON.parse(localStorage.getItem("data") as string)));
  }, [dispatch]);

  return (
    <div className="db-records-container">
      <div className="db-records-top">
        <h2>Records</h2>
        {/* Import button */}
        <Button
          variant="regular"
          text="Import JSON"
          action={() => openFileDialog()}
        />
        {/* File input */}
        <input
          type="file"
          accept=".json"
          ref={fileRef}
          onChange={(e) => handleFileInput(e)}
          style={{ display: "none" }}
        />
      </div>
      <div className="db-records">
        {/* Records */}
        {records
          ? records["data"].map((item, key) => {
              return (
                <div className="db-record" key={key} data-index={key}>
                  <div className="db-top">
                    {/* Textarea */}
                    <div className="textarea-container">
                      <textarea
                        minLength={1}
                        maxLength={280}
                        value={item.data.join("\n")}
                        onChange={(e) =>
                          // Update records
                          updateRecords(
                            e.target.value,
                            parseInt(
                              e.target["parentElement"]![
                                "parentElement"
                              ]!.getAttribute("data-index") as string
                            )
                          )
                        }
                      ></textarea>
                      <span>{item.data.join("\n").length}/280</span>
                    </div>
                    <p className="db-record-counter">
                      <span>Count: </span>
                      {item.count}
                    </p>
                  </div>
                  {/* Delete button */}
                  <Button
                    variant="error"
                    text="Delete record"
                    action={(e) =>
                      deleteRecord(
                        e.target["parentElement"]["parentElement"][
                          "parentElement"
                        ].getAttribute("data-index")
                      )
                    }
                  />
                </div>
              );
            })
          : "There are no records."}
      </div>
    </div>
  );
};

export default DBRecords;
