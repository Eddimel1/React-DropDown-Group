import React from "react";
import { FC } from "react";
import { ArrowPositioner } from "../../../ArrowPositioner/ArrowPositioner";
import classes from "./DefaultArrow.module.scss";
type Props = {
  depth: number;
  open: boolean;
};
export const DefaultArrow: FC<Props> = ({ open, depth=0 }) => {
  return (
    <ArrowPositioner
      arrow={<i className={classes.linkDropDownGroupArrow}></i>}
      open={open}
      depth={depth}
      isCustom={false}
    ></ArrowPositioner>
  );
};
