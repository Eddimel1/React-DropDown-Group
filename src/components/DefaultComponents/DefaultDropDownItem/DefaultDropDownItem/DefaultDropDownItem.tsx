import { FC } from "react";
import classes from "./DefaultDropDownItem.module.scss";
type Props = {
  label: string;
  icon?: any;
  iconPosition?: "left" | "right";
  arrow?: React.ReactNode;
};

export const DefaultDropDownItem: FC<Props> = ({
  label,
  icon,
  arrow,
  iconPosition = "left",
}) => {
  return (
    <div className={classes.defaultDropDownItemWrapper}>
      <div className={classes.defaultDropDownItemContainer}>
        <div className={classes.labelAndIcon}>
          <div>{label}</div>
          <div style={{ order: iconPosition === "left" ? "-1" : "" }}>
            {typeof icon === "function" ? icon({}) : icon}
          </div>
        </div>
        <div className={classes.arrowWrapper}>{arrow && arrow}</div>
      </div>
    </div>
  );
};
