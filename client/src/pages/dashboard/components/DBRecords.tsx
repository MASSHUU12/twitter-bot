import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { editOn } from "../../../features/editSlice";
import { editRecords } from "../../../features/recordsSlice";
import { deleteRecord } from "../../../helpers/records/deleteRecord";
import { importRecords } from "../../../helpers/records/importRecords";
import Button from "../../../components/Button";
import UpdateScreen from "./UpdateScreen";

const DBRecords = () => {
  const records = useAppSelector((state) => state.records.value);
  const openEdit = useAppSelector((state) => state.edit.value);
  const dispatch = useAppDispatch();

  const fileRef = useRef<any>(null);

  useEffect(() => {
    // Get records on page load and send it to Redux.
    dispatch(editRecords(JSON.parse(localStorage.getItem("data") as string)));
  }, [dispatch]);

  const openFileDialog = () => {
    if (fileRef.current instanceof HTMLElement !== true) return;
    fileRef.current.click();
  };

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

  return (
    <>
      <div className="db-records-container">
        <h3>Records</h3>
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
        <div className="db-records">
          {/* Records */}
          {records
            ? records["data"].map((item, key) => {
                return (
                  <div className="db-record" key={key} data-index={key}>
                    <div className="db-top">
                      {/* Textarea */}
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
                    {/* Buttons */}
                    <div className="db-btm">
                      <Button
                        variant="regular"
                        text="Edit record"
                        action={(e) =>
                          dispatch(
                            editOn({
                              index:
                                e.target["parentElement"]["parentElement"][
                                  "parentElement"
                                ].getAttribute("data-index"),
                              text: item.data.join("\n"),
                            })
                          )
                        }
                      />
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
                  </div>
                );
              })
            : "There are no records."}
        </div>
      </div>
      {openEdit && <UpdateScreen />}
    </>
  );
};

export default DBRecords;
