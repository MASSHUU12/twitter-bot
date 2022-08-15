import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { notification } from "../../../features/notificationSlice";
import "../../../style/notification.scss";

/**
 * Notification component.
 *
 * @returns JSX.Element
 */
const Notification = (): JSX.Element => {
  const notificationInfo = useAppSelector((state) => state.notification.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    notificationInfo.message !== "" &&
      setTimeout(
        () =>
          dispatch(
            notification({
              message: "",
              type: "",
            })
          ),
        5000
      );
  }, [notificationInfo, dispatch]);

  return (
    <>
      {notificationInfo.type && (
        <div
          className={`notification-container${
            notificationInfo.type === "error" ? " notification-error" : ""
          }`}
        >
          <h3>{notificationInfo.message}</h3>
        </div>
      )}
    </>
  );
};

export default Notification;
