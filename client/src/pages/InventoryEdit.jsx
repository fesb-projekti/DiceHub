import { useState } from "react";
import classes from "./InventoryEdit.module.css";
import { Link } from "react-router-dom";

function InventoryEdit() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredGames, setEnteredGames] = useState("");
  const [enteredFavorite, setEnteredFavorite] = useState("");
  const [enteredTrading, setEnteredTrading] = useState("");
  const [enteredLookingFor, setEnteredLookingFor] = useState("");

  const descChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const gamesChangeHandler = (event) => {
    setEnteredGames(event.target.value);
  };

  const favChangeHandler = (event) => {
    setEnteredFavorite(event.target.value);
  };

  const tradingChangeHandler = (event) => {
    setEnteredTrading(event.target.value);
  };

  const lookingForChangeHandler = (event) => {
    setEnteredLookingFor(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const gamesData = {
      description: enteredDescription,
      games: enteredGames,
      favorite: enteredFavorite,
      trading: enteredTrading,
      lookingFor: enteredLookingFor,
    };

    console.log(gamesData);
  };

  return (
    <div className={classes.inventoryEdit}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label>Your description:</label>
          <textarea
            type="text"
            rows={5}
            value={enteredDescription}
            onChange={descChangeHandler}
            placeholder="Your description:"
          />
        </div>
        <div className={classes.control}>
          <label>Games owned:</label>
          <input
            type="text"
            value={enteredGames}
            onChange={gamesChangeHandler}
            placeholder="What games do you own?"
          />
        </div>
        <div className={classes.control}>
          <label>Favorite game:</label>
          <input
            type="text"
            value={enteredFavorite}
            onChange={favChangeHandler}
            placeholder="What is your favorite game?"
          />
        </div>
        <div className={classes.control}>
          <label>Trading:</label>
          <input
            type="text"
            value={enteredTrading}
            onChange={tradingChangeHandler}
            placeholder="What games are you trading?"
          />
        </div>
        <div className={classes.control}>
          <label>Looking for:</label>
          <input
            type="text"
            value={enteredLookingFor}
            onChange={lookingForChangeHandler}
            placeholder="What are you looking for?"
          />
        </div>
        <div className={classes.actions}>
          <input type="submit" value="Save" className={classes.submitBtn} />
          <Link to="/inventory/:id" className={classes.cancel}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
