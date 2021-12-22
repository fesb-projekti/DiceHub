import { useState, useEffect, useRef, useMemo, createRef } from 'react'
import SwipeCard from "../components/SwipeCard";
import classes from "./Home.module.css";

function Home() {

  const [profileCards, setProfileCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>Array(profileCards.length).fill(0).map((i) => createRef()),[profileCards.length]
  )

  useEffect(() => {
    const getProfileCards = async () => {
      const profileCardsFromServer = await fetchProfileCards();
      setProfileCards(profileCardsFromServer);
      setCurrentIndex(profileCardsFromServer.length-1)
    }
    getProfileCards();
  }, [])

  const fetchProfileCards = async () => {
    const res = await fetch("https://dice-hub.ga/api/profilecards");
    const data = await res.json();
    return data;
  }

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  }

  const canGoBack = currentIndex < profileCards.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index-1);
  }

  const swipe = (dir) => {
    if (canSwipe && currentIndex < profileCards.length+1) {
      childRefs[currentIndex].current.swipe(dir);
      updateCurrentIndex(currentIndex - 1);
    }
  }

  const outOfFrame = (name, idx) => {
    //console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  }

  const goBack = () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className={classes.home}>
      <div className={classes.cardContainer}>
        {profileCards.map((character, index) =>
          <SwipeCard className={classes.swipe}
            ref={childRefs[index]}
            key={character.id}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}>
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
      {lastDirection ? <h3 className={classes.infoText}>You swiped {lastDirection}</h3> : ""}
      <div className={classes.buttons}>
        <button onClick={() => swipe("left")}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" /></svg></button>
        <button onClick={() => goBack()}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" /></svg></button>
        <button><img src="https://img.icons8.com/metro/26/000000/info.png" alt="" /></button>
        <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></button>
        <button onClick={() => swipe("right")}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" /></svg></button>
      </div>
    </div>
  )
}

export default Home