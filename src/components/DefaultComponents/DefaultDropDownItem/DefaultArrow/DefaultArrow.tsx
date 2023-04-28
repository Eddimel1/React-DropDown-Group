import { FC } from "react";
import { ArrowPositioner } from "../../../ArrowPositioner/ArrowPositioner";
import classes from "./DefaultArrow.module.scss";
type Props = {
  open: boolean;
};
export const DefaultArrow: FC<Props> = ({ open}) => {
  return (
    <ArrowPositioner
      arrow={<span className={classes.linkDropDownGroupArrow}></span>}
      open={open}
    ></ArrowPositioner>
  );
};
