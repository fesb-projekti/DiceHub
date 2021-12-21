import { useState } from "react";
import classes from "./InventoryEdit.module.css";

function InventoryEdit() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredGames, setEnteredGames] = useState("");
  const [enteredFavorite, setEnteredFavorite] = useState("");

  const descChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const gamesChangeHandler = (event) => {
    setEnteredGames(event.target.value);
  };

  const favChangeHandler = (event) => {
    setEnteredFavorite(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const gamesData = {
      description: enteredDescription,
      games: enteredGames,
      favorite: enteredFavorite,
    };

    console.log(gamesData);
  };

  return (
    <div className={classes.inventoryEdit}>
      <form onSubmit={submitHandler}>
        <div className={classes.inputField}>
          <label>
            Your Description:
            <input
              type="text"
              value={enteredDescription}
              onChange={descChangeHandler}
              className={classes.input}
            />
          </label>
        </div>
        <div className={classes.inputField}>
          <label>
            Games owned:
            <input
              type="text"
              value={enteredGames}
              onChange={gamesChangeHandler}
              className={classes.input}
            />
          </label>
        </div>
        <div className={classes.inputField}>
          <label>
            Favorite game:
            <input
              type="text"
              value={enteredFavorite}
              onChange={favChangeHandler}
              className={classes.input}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Save" className={classes.submitBtn} />
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
