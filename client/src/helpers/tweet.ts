import Axios from "./axios";
import { newNotification } from "./newNotification";
import { getRecord } from "./records/getRecord";

/**
 * Call server to post tweet.
 *
 * @return void
 */
export const tweet = (): void => {
  Axios.request({
    url: "/tweet",
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { data: getRecord().data },
  })
    .then(() => newNotification("Tweet send."))
    .catch((err) => newNotification(err.message));
};
