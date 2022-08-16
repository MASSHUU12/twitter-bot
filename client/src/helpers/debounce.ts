import _ from "underscore";
import { newNotification } from "./newNotification";

export const updateNotificationDebounce = _.debounce(
  () => newNotification("Record updated."),
  1000
);
