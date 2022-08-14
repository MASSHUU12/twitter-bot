interface Props {
  variant: "regular" | "error";
  text: string;
  action: (e: any) => any;
}

const Button = ({ variant, text, action }: Props) => {
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
