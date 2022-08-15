import store from "../../app/store";
import { editRecords } from "../../features/recordsSlice";

/**
 * Search for the record with the smallest count.
 */
export const getRecord = (): {
  data: string;
  count: number;
} => {
  // Get records from database.
  const records: { data: [{ data: string; count: number }] } = JSON.parse(
    localStorage.getItem("data") as string
  );

  // Store item reference.
  const recordRef = {
    index: 0,
    count: Infinity,
  };

  // Search for the record with the smallest count.
  records["data"].forEach(
    (item: { data: string; count: number }, index: number) => {
      if (item.count < recordRef.count) {
        recordRef.count = item.count;
        recordRef.index = index;
      }
    }
  );

  // Update count for the selected item.
  records["data"][recordRef.index].count += 1;

  // Save updated records in database and Redux.
  localStorage.setItem("data", JSON.stringify(records));
  store.dispatch(editRecords(records));

  // Return record with smallest count.
  return records["data"][recordRef.index];
};
