import classes from "./Inventory.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "./assets/boardgames.png";

function Inventory() {
  const [aboutFav, setAboutFav] = useState({});
  const [ownedGames, setOwnedGames] = useState({});
  const [lookingFor, setLookingFor] = useState({});
  const [trading, setTrading] = useState({});

  useEffect(() => {
    const getAboutFav = async () => {
      const aboutFavFromServer = await fetchAboutFav();
      setAboutFav(aboutFavFromServer);
    };
    const getOwnedGames = async () => {
      const ownedGamesFromServer = await fetchOwnedGames();
      setOwnedGames(ownedGamesFromServer);
    };
    const getLookingFor = async () => {
      const lookingForFromServer = await fetchLookingFor();
      setLookingFor(lookingForFromServer);
    };
    const getTrading = async () => {
      const tradingFromServer = await fetchTrading();
      setTrading(tradingFromServer);
    };
    getAboutFav();
    getOwnedGames();
    getLookingFor();
    getTrading();
  }, []);

  const fetchAboutFav = async () => {
    const res = await fetch("http://localhost:3001/inventory/getAbout_FavGame");
    const data = await res.json();
    return data;
  };
  const fetchOwnedGames = async () => {
    const res = await fetch("http://localhost:3001/inventory/getOwnedGames");
    const data = await res.json();
    return data;
  };
  const fetchLookingFor = async () => {
    const res = await fetch("http://localhost:3001/inventory/looking4");
    const data = await res.json();
    return data;
  };
  const fetchTrading = async () => {
    const res = await fetch("http://localhost:3001/inventory/giving4trade");
    const data = await res.json();
    return data;
  };

  return (
    <div className={classes.inventory}>
      <img src={image} alt="Board games"></img>
      <div className={classes.spacer}>
        <h3>My Inventory</h3>
      </div>
      <div className={classes.container}>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Player description: </span>
          <span>{aboutFav?.about}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Looking for: </span>
          <span>{lookingFor?.titles}</span>
        </div>
        <div className={classes.spacer}>
          <h3>Games</h3>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Games owned: </span>
          <span>{ownedGames?.titles}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Favorite game: </span>
          <span>{aboutFav?.favorite}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Trading: </span>
          <span>{trading?.titles}</span>
        </div>
        <button>
          <Link to="../inventory_edit" className={classes.link}>Edit</Link>
        </button>
      </div>
    </div>
  );
}

export default Inventory;
