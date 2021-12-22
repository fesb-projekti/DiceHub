import classes from "./Inventory.module.css";
import { Link } from "react-router-dom";

function Inventory() {
  return (
    <div className={classes.inventory}>
      <div className={classes.inventoryDiv}>
        <span className={classes.inventoryDesc}>Player description: </span>
        <span>Ja sam mali mate od mame i tate </span>
      </div>
      <div className={classes.inventoryDiv}>
        <span className={classes.inventoryDesc}>Games owned: </span>
        <span>Sudoku, Ne ljuti se konju</span>
      </div>
      <div className={classes.inventoryDiv}>
        <span className={classes.inventoryDesc}>Favorite game: </span>
        <span>Sudoku</span>
      </div>
      <button>
        <Link to="../inventory_edit" className={classes.link}>
          Edit
        </Link>
      </button>
    </div>
  );
}

export default Inventory;
