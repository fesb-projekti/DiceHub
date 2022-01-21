import classes from "./Inventory.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "./assets/boardgames.png";

function Inventory() {
  const [aboutFav, setAboutFav] = useState([]);
  const [ownedGames, setOwnedGames] = useState([]);
  const [lookingFor, setLookingFor] = useState([]);
  const [trading, setTrading] = useState([]);
  const [profile, setProfile] = useState({});

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
    const getProfile = async () => {
      const profileFromServer = await fetchProfile();
      setProfile(profileFromServer);
  }
    getAboutFav();
    getOwnedGames();
    getLookingFor();
    getTrading();
    getProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("https://dice-hub.ga/api/profileCards/profile/" + localStorage.getItem("id"));
    const data = await res.json();
    return data;
}
  const fetchAboutFav = async () => {
    const res = await fetch("https://dice-hub.ga/api/inventory/favGameAndGenre/" + localStorage.getItem("id"));
    const data = await res.json();
    return data;
  };
  const fetchOwnedGames = async () => {
    const res = await fetch("https://dice-hub.ga/api/inventory/getOwnedGames/" + localStorage.getItem("id"));
    const data = await res.json();
    return data;
  };
  const fetchLookingFor = async () => {
    const res = await fetch("https://dice-hub.ga/api/inventory/looking4/" + localStorage.getItem("id"));
    const data = await res.json();
    return data;
  };
  const fetchTrading = async () => {
    const res = await fetch("https://dice-hub.ga/api/inventory/giving4trade/" + localStorage.getItem("id"));
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
          <span>{profile[0]?.About}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Looking for: </span>
          <span>{lookingFor.map((el)=>(el?.naziv+" "))} </span>
        </div>
        <div className={classes.spacer}>
          <h3>Games</h3>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Games owned: </span>
          <span>{ownedGames?.map((el)=>(el?.naziv+" "))}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Favorite game: </span>
          <span>{aboutFav[0]?.FavGame}</span>
        </div>
        <div className={classes.inventoryDiv}>
          <span className={classes.inventoryDesc}>Trading: </span>
          <span>{trading[0] == undefined ? "Nothing so far" : trading.map((el)=>(el?.naziv+" "))}</span>
        </div>
        <button>
          <Link to="../inventory_edit" className={classes.link}>Edit</Link>
        </button>
      </div>
    </div>
  );
}

export default Inventory;
