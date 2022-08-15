import { Icon } from "@iconify/react";
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

  return (
    <div className="toggle-btn" onClick={() => clicked()}>
      {toggle ? <Icon icon="jam:rec" /> : <Icon icon="bi:record-fill" />}
      <span>{toggle ? title : toggleTitle}</span>
    </div>
  );
};

export default Toggle;
