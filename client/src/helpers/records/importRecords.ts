import store from "../../app/store";
import { editRecords } from "../../features/recordsSlice";
import { newNotification } from "../newNotification";

/**
 * Import records from .json file.
 *
 * @param content string
 *
 * @return void
 */
export const importRecords = (content: string): void => {
  localStorage.setItem("data", JSON.stringify(JSON.parse(content)));
  store.dispatch(editRecords(JSON.parse(content)));

  // Records imported notification.
  newNotification("Records imported.");
};
