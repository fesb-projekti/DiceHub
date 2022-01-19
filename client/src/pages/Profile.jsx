import classes from "./Profile.module.css";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Profile() {

    const [profile, setProfile] = useState({});
    const [ratings, setRatings] = useState({});
    const [rater, setRater] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const getProfile = async () => {
            const profileFromServer = await fetchProfile();
            setProfile(profileFromServer);
        }
        const getRating = async () => {
            const ratingFromServer = await fetchRating();
            setRatings(ratingFromServer);
        }
        const getRater = async () => {
            const raterInfoFromServer = await fetchRater();
            setRater(raterInfoFromServer);
        }
        getRating();
        getProfile();
        getRater();
    }, [])

    const fetchProfile = async () => {
        if (id === undefined || "" || null)
            id = localStorage.getItem("id");
        const res = await fetch("https://dice-hub.ga/api/profileCards/profile/" + id).catch(() => { console.log("Fetch error - Home") });
        const data = await res.json();
        return data;
    }
    const fetchRating = async () => {
        if (id === undefined || "" || null)
            id = localStorage.getItem("id");
        const res = await fetch("https://dice-hub.ga/api/getRatings/" + id).catch(() => { console.log("Fetch error - Profile") });
        const data = await res.json();
        return data;
    }
    const fetchRater = async () => {
        if (id !== undefined) {
            const res = await fetch("https://dice-hub.ga/api/getRater/" + localStorage.getItem("id") + "/"+ id).catch(() => { console.log("Fetch error - Profile") });
            const data = await res.json();
            return data;
        }
    }

    const changeRating = async (arg) => {
        //TODO          
    }

    if (ratings.positive === undefined || ratings.negative === undefined) {
        return 'Loading...';
    }
    else
        return (
            <div className={classes.profile}>
                <div className={classes.profileHeader}>
                    <img src={profile[0]?.img} alt="IMG" />
                    <div className={classes.rating}>
                        <h3 className={classes.username}>{profile[0]?.ime} {profile[0]?.prezime}</h3>
                        <div className={classes.infoRow}>
                            <span className={classes.infoDesc}>Positive ratings: </span>
                            <span className={classes.infoData}>{ratings?.positive[0]?.Broj}</span>
                        </div>
                        <div className={classes.infoRow}>
                            <span className={classes.infoDesc}>Negative ratings: </span>
                            <span className={classes.infoData}>{ratings?.negative[0]?.Broj}</span>
                        </div>
                        <div className={classes.infoRow}>
                            <span className={classes.infoDesc}>Times matched: </span>
                            <span className={classes.infoData}>{ratings?.positive[0]?.Broj}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.bio}>
                    <div className={classes.spacer}>
                        <h3>Personal information</h3>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Age: </span>
                        <span className={classes.infoData}>{profile[0]?.age}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Location: </span>
                        <span className={classes.infoData}>{profile[0]?.grad}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Favorite game: </span>
                        <span className={classes.infoData}>{profile[0]?.favorite_game}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Favorite genre: </span>
                        <span className={classes.infoData}>{profile[0]?.favorite_genre}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Location to play: </span>
                        <span className={classes.infoData}>{profile[0]?.hasLocation}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>About myself: </span>
                        <span className={classes.infoData}>{profile[0]?.about}</span>
                    </div>
                </div>
                <div className={classes.library}>
                    <div className={classes.spacer}>
                        <h3>Library</h3>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Looking for: </span>
                        <span className={classes.infoData}>{profile[0]?.looking_for}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Trading: </span>
                        <span className={classes.infoData}>{profile[0]?.trading_titles}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Games owned: </span>
                        <span className={classes.infoData}>{profile[0]?.games_owned}</span>
                    </div>
                </div>
                <div className={classes.rate}>
                    <button onClick={() => changeRating(-1)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" /></svg></button>
                    <button onClick={() => changeRating(1)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" /></svg></button>
                </div>
            </div>
        );
}

export default Profile;