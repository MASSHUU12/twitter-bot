interface Props {
  variant: "regular" | "error";
  text: string;
  action: () => any;
}

const Button = ({ variant, text, action }: Props) => {
  return (
    <div
      className={`btn-regular${
        variant === "error" ? " btn-regular-error" : ""
      }`}
      onClick={action}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;
