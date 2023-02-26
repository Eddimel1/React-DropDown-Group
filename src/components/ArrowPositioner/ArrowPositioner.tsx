import React from "react";
import  { FC } from "react";
import classes from "./ArrowPositioner.module.scss";

type _props = {
  arrow: JSX.Element;
  open: boolean;
  depth: number;
  isCustom:boolean
};
export const ArrowPositioner: FC<_props> = ({ arrow, depth, open ,isCustom}) => {
    const depth0 = `${isCustom && !depth ? `${classes.customDepth0Position}` : `${classes.defaultDepth0Position}` }`
    const depth1AndAbove = `${isCustom && depth > 0 ? `${classes.customDepth1AndAbovePosition}` : `${classes.defaultDepth1AndAbovePosition}` }`
  return (
    <div
      className={`${
        !open ? `${classes.rotateToBottom}` : `${classes.rotateToRight}`
      } ${
        !depth
          ? depth0
          : depth1AndAbove
      }`}
    >
      {arrow}
    </div>
  );
};
