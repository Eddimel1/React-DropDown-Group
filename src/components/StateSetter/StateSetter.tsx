import { FC, memo } from "react";
import classes from "./StateSetter.module.scss";
type Props = {
  label: string;
};
export const DefaultStateSetter: FC<Props> = memo(({ label }) => {
  return <div data-react-dropdown-unit  className={classes.stateSetter}>{label}</div>;
});
