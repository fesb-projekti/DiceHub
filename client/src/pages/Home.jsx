import { useState, useEffect } from 'react'
import SwipeCard from "../components/SwipeCard";
import classes from "./Home.module.css";

function Home() {

  const [profileCards, setProfileCards] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    const getProfileCards = async () => {
      const profileCardsFromServer = await fetchProfileCards();
      setProfileCards(profileCardsFromServer);
    }
    getProfileCards();
  }, [])

  const fetchProfileCards = async () => {
    const res = await fetch("http://localhost:3001/profilecards");
    const data = await res.json();
    return data;
  }

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className={classes.home}>
      <div className={classes.cardContainer}>
        {profileCards.map((character) =>
          <SwipeCard className={classes.swipe} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div className={classes.card} style={{ backgroundImage: 'url(' + character.url + ')' }}>
              <h3>{character.name}</h3>
            </div>
          </SwipeCard>
        )}
      </div>
      <div className={classes.info}>
        <div className={classes.infoRow}>
          <span className={classes.infoDesc}>Name: </span>
          <span className={classes.infoData}>Mate</span>
        </div>
        <div className={classes.infoRow}>
          <span className={classes.infoDesc}>Surname: </span>
          <span className={classes.infoData}>Matic</span>
        </div>
        <div className={classes.infoRow}>
          <span className={classes.infoDesc}>Location: </span>
          <span className={classes.infoData}>Split</span>
        </div>
        <div className={classes.infoRow}>
          <span className={classes.infoDesc}>Games owned: </span>
          <span className={classes.infoData}>12</span>
        </div>
        <div className={classes.infoRow}>
          <span className={classes.infoDesc}>Favorite genre: </span>
          <span className={classes.infoData}>Fantasy</span>
        </div>
      </div>
      {lastDirection ? <h3 className={classes.infoText}>You swiped {lastDirection}</h3> : <h4 className={classes.infoText} />}
      <div className={classes.buttons}>
        <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" /></svg></i>
        <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" /></svg></i>
        <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M0 0h24v24H0z" fill="none" /><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></i>
        <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></i>
        <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" /></svg></i>
      </div>
    </div>
  )
}

export default Home