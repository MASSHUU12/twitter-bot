import { Icon } from "@iconify/react";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import "../style/buttonToggle.scss";

interface Props {
  title: string;
  toggleTitle: string;
  action: () => any;
}

/**
 * Toggle button component.
 *
 * @param title - string
 * @param toggleTitle - string
 * @param action - () => any
 *
 * @returns JSX.Element
 */
const Toggle = ({ title, toggleTitle, action }: Props): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(true);

  const clicked = () => {
    action();

    setToggle((state) => !state);
  };

  const [styles, api] = useSpring(() => ({
    to: {
      scale: 1,
      background: "#1DA1F2",
    },
  }));

  return (
    <animated.div
      style={styles}
      className="toggle-btn"
      onClick={() => clicked()}
      onMouseOver={() =>
        api.start({
          to: {
            scale: 1.05,
            background: toggle ? "#1DA1F2" : "#FD6B68",
          },
        })
      }
      onMouseLeave={() =>
        api.start({
          to: {
            scale: !toggle ? 1.05 : 1,
            background: toggle ? "#1DA1F2" : "#FD6B68",
          },
        })
      }
    >
      {toggle ? <Icon icon="jam:rec" /> : <Icon icon="bi:record-fill" />}
      <span>{toggle ? title : toggleTitle}</span>
    </animated.div>
  );
};

export default Toggle;
