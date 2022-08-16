import { useSpring, animated } from "@react-spring/web";
import "../style/button.scss";

interface Props {
  variant: "regular" | "error";
  text: string;
  action: (e: any) => any;
}

/**
 * Custom button component.
 *
 * @param variant - error | regular
 * @param text - string
 * @param action - (e: any) => any
 *
 * @returns JSX.Element
 */
const Button = ({ variant, text, action }: Props): JSX.Element => {
  const [styles, api] = useSpring(() => ({
    to: {
      scale: 1,
    },
  }));

  return (
    <animated.div
      style={styles}
      onMouseOver={() =>
        api.start({
          to: { scale: 1.05 },
        })
      }
      onMouseLeave={() => api.start({ to: { scale: 1 } })}
      className={`btn-regular${
        variant === "error" ? " btn-regular-error" : ""
      }`}
      onClick={(e) => action(e)}
    >
      <span>{text}</span>
    </animated.div>
  );
};

export default Button;
