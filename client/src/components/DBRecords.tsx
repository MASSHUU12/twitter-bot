import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editOn } from "../features/editSlice";
import { editRecords } from "../features/recordsSlice";
import { deleteRecord } from "../helpers/deleteRecord";
import Button from "./Button";
import UpdateScreen from "./UpdateScreen";

const DBRecords = () => {
  const records = useAppSelector((state) => state.records.value);
  const openEdit = useAppSelector((state) => state.edit.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get records on page load and send it to Redux.
    dispatch(editRecords(JSON.parse(localStorage.getItem("data") as string)));
  }, [dispatch]);

  return (
    <>
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
                  <div className="db-record" key={key} data-index={key}>
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
