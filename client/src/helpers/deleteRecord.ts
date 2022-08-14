import store from "../app/store";
import { editRecords } from "../features/recordsSlice";

/**
 * Delete specific record.
 */
export const deleteRecord = (id: number): void => {
  const records: { data: [{ data: string; count: number }] } = JSON.parse(
    localStorage.getItem("data") as string
  );

  // Remove element.
  records["data"].splice(id, 1);

  // Save new records in Web Storage and Redux.
  localStorage.setItem("data", JSON.stringify(records));
  store.dispatch(editRecords(records));
};
