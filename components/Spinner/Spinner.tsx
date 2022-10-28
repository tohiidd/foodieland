import classes from "./styles.module.css";

function Spinner() {
  return (
    <div className={classes.loadingSpinnerContainer}>
      <div className={classes.loadingSpinner}></div>
    </div>
  );
}

export default Spinner;
