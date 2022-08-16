import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { notification } from "../features/notificationSlice";
import "../style/notification.scss";
import { useSpring, animated } from "@react-spring/web";

/**
 * Notification component.
 *
 * @returns JSX.Element
 */
const Notification = (): JSX.Element => {
  // Get notification info.
  const notificationInfo = useAppSelector((state) => state.notification.value);
  const dispatch = useAppDispatch();

  // Get notification component.
  const com = useRef<HTMLHeadingElement>(null);

  const [show, setShow] = useState(false);

  // Animation
  const props = useSpring({
    to: {
      // Get component width and add 10 so whole component fit scene.
      x: com.current ? com.current?.offsetWidth + 25 : 200,
    },
    from: {
      x: 0,
    },
    reverse: show,
    onRest: () => {
      show === false &&
        dispatch(
          notification({
            message: "",
            type: "",
          })
        );
    },
  });

  // Show notification onload and hide after some time.
  useEffect(() => {
    // If notification exists display it.
    if (notificationInfo.message !== "") {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [notificationInfo, dispatch]);

  return (
    <>
      {notificationInfo.type && (
        <animated.div
          ref={com}
          style={props}
          className={`notification-container${
            notificationInfo.type === "error" ? " notification-error" : ""
          }`}
        >
          <h3>{notificationInfo.message}</h3>
        </animated.div>
      )}
    </>
  );
};

export default Notification;
