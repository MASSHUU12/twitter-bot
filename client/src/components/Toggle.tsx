import { Icon } from "@iconify/react";
import { useState } from "react";

interface Props {
  title: string;
  toggleTitle: string;
  action: () => any;
}

const Toggle = ({ title, toggleTitle, action }: Props): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(true);

  const clicked = () => {
    action();

    setToggle((state) => !state);
  };

  return (
    <div className="toggle-btn" onClick={() => clicked()}>
      {toggle ? <Icon icon="jam:rec" /> : <Icon icon="bi:record-fill" />}
      <span>{toggle ? title : toggleTitle}</span>
    </div>
  );
};

export default Toggle;
