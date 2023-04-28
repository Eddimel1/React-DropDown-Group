import { FC } from "react";
import classes from "./ArrowPositioner.module.scss";

type _props = {
  arrow: JSX.Element;
  open: boolean;
};
export const ArrowPositioner: FC<_props> = ({ arrow, open}) => {
  return (
    <div
      className={`${
        !open ? `${classes.rotateToBottom}` : `${classes.rotateToRight}`
      }`}
    >
      {arrow}
    </div>
  );
};
