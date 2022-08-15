import store from "../app/store";
import { notification } from "../features/notificationSlice";

/**
 * Creates new notification.
 *
 * @param message - string
 * @param type - "regular" | "error" (default "regular")
 */
export const newNotification = (
  message: string,
  type: "regular" | "error" = "regular"
): void => {
  store.dispatch(
    notification({
      message: message,
      type: type,
    })
  );
};
