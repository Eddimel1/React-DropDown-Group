import React, { FC} from "react";
import classes from "./DefaultDropDownItem.module.scss";
type Props = {
  label: string;
  icon?: any
  arrow?: React.ReactNode;
};

export const DefaultDropDownItem: FC<Props> = ({ label, icon, arrow }) => {
  return (
    <div className={classes.defaultDropDownItemWrapper}>
      <div className={classes.defaultDropDownItemContainer}>
        <div style={{ display: "flex" }}>
          <div>{label}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div> {typeof icon === 'function' ? icon({}) : icon}</div>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>{arrow && arrow}</div>
      </div>
    </div>
  );
};
