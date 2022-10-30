import classes from "./styles.module.css";

interface Props {
  full?: boolean;
  blue?: boolean;
}
function Spinner({ full, blue }: Props) {
  return (
    <div className={classes.loadingSpinnerContainer}>
      <div className={`${full ? classes.spinnerFull : classes.spinner} ${blue ? classes.blue : ""}`}></div>
    </div>
  );
}

export default Spinner;
