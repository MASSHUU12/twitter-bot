import store from "../../app/store";
import { editRecords } from "../../features/recordsSlice";

/**
 * Add record to database.
 *
 * @returns void
 */
export const addRecord = (value: string): void => {
  // Get records from database.
  const records = JSON.parse(localStorage.getItem("data") as string);

  // Push new record.
  records["data"].push({
    data: value.split("\n"),
    count: 0,
  });

  // Update records in Web Storage and Redux.
  localStorage.setItem("data", JSON.stringify(records));
  store.dispatch(editRecords(records));
};
