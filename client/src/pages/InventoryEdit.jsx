import { useState } from "react";
import classes from "./InventoryEdit.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function InventoryEdit() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredGames, setEnteredGames] = useState([]);
  const [enteredFavorite, setEnteredFavorite] = useState("");
  const [enteredTrading, setEnteredTrading] = useState([]);
  const [enteredLookingFor, setEnteredLookingFor] = useState("");
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      const allGamesFromServer = await fetchAllGames();
      setAllGames(allGamesFromServer);
    };
    getAllGames();
  });

  const fetchAllGames = async () => {
    const res = await fetch("http://localhost:3001/inventory_edit/getAllGames");
    const data = await res.json();
    return data;
  };

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

    const aboutFav = {
      about: enteredDescription,
      fav: enteredFavorite,
    };
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
