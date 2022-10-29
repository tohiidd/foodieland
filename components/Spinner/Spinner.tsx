import classes from "./styles.module.css";

function Spinner({ full }: { full?: boolean }) {
  return (
    <div className={classes.loadingSpinnerContainer}>
      <div className={full ? classes.spinnerFull : classes.spinner}></div>
    </div>
  );
}

export default Spinner;
