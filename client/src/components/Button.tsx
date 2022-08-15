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
  return (
    <div
      className={`btn-regular${
        variant === "error" ? " btn-regular-error" : ""
      }`}
      onClick={(e) => action(e)}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;
