import store from "../../app/store";
import { editRecords } from "../../features/recordsSlice";

/**
 * Import records from .json file.
 *
 * @param content string
 */
export const importRecords = (content: string): void => {
  localStorage.setItem("data", JSON.stringify(JSON.parse(content)));
  store.dispatch(editRecords(JSON.parse(content)));
};
