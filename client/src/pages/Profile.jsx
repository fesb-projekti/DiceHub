import classes from "./Profile.module.css";
import { useState, useEffect } from 'react'

function Profile() {

    const [profile, setProfile] = useState({});
    const [canRate, setCanRate] = useState("false");
    let ratings = {};

    useEffect(() => {
        const getProfile = async () => {
            const profileFromServer = await fetchProfile();
            setProfile(profileFromServer);
        }
        const getRating = async () => {
            const ratingFromServer = await fetchRating();
            setCanRate(ratingFromServer.canRate);
            ratings = ratingFromServer;
            console.log("rating: " + ratingFromServer.canRate);
        }
        getProfile();
        getRating();
    }, [])

    const fetchProfile = async () => {
        const res = await fetch("https://dice-hub.ga/api/profile");
        const data = await res.json();
        return data;
    }
    const fetchRating = async () => {
        const res = await fetch("https://dice-hub.ga/api/profile_ratings");
        const data = await res.json();
        return data;
    }

    // Check if first vote
    const changeRating = async (arg) => {
        const updatedProfile = { ...profile };
        if (arg === 1 && canRate === "negative") {
            if (canRate === "negative")
                updatedProfile.negative_ratings -= 1;
            updatedProfile.positive_ratings += 1;
            setProfile(updatedProfile);
            setCanRate("positive");
            ratings.canRate = "positive";
            updateRating();
            updateProfile(updatedProfile);
        }
        else if (arg === -1 && canRate === "positive") {
            if (canRate === "positive")
                updatedProfile.positive_ratings -= 1;
            updatedProfile.negative_ratings += 1;
            setProfile(updatedProfile);
            setCanRate("negative");
            ratings.canRate = "negative";
            updateRating();
            updateProfile(updatedProfile);
        }
        else if (arg === 1 && canRate === "") {
            updatedProfile.positive_ratings += 1;
            setProfile(updatedProfile);
            setCanRate("negative");
            ratings.canRate = "negative";
            updateRating();
            updateProfile(updatedProfile);
        }
        else if (arg === -1 && canRate === "") {
            updatedProfile.negative_ratings += 1;
            setProfile(updatedProfile);
            setCanRate("negative");
            ratings.canRate = "negative";
            updateRating();
            updateProfile(updatedProfile);
        }
    }

    const updateProfile = async (profile) => {
        await fetch("https://dice-hub.ga/api/profile", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(profile)
        }).then(() => { console.log("Profile updated JSON") })
    }
    const updateRating = async () => {
        await fetch("https://dice-hub.ga/api/profile_ratings", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(ratings)
        }).then(() => { console.log("Ratings updated JSON") })
    }

    return (
        <div className={classes.profile}>
            <div className={classes.profileHeader}>
                <img src={profile.avatar} alt="IMG" />
                <div className={classes.rating}>
                    <h3>Ratings</h3>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Positive ratings: </span>
                        <span className={classes.infoData}>{profile.positive_ratings}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Negative ratings: </span>
                        <span className={classes.infoData}>{profile.negative_ratings}</span>
                    </div>
                    <div className={classes.infoRow}>
                        <span className={classes.infoDesc}>Times matched: </span>
                        <span className={classes.infoData}>{profile.times_matched}</span>
                    </div>
                </div>
            </div>
            <div className={classes.bio}>
                <div className={classes.spacer}>
                    <h3>Personal information</h3>
                </div>
                <span className={classes.username}>{profile.name} {profile.surname}</span>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Age: </span>
                    <span className={classes.infoData}>{profile.age}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Location: </span>
                    <span className={classes.infoData}>{profile.location}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Favorite game: </span>
                    <span className={classes.infoData}>{profile.favorite_game}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Favorite genre: </span>
                    <span className={classes.infoData}>{profile.favorite_genre}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Location to play: </span>
                    <span className={classes.infoData}>{profile.has_location}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>About myself: </span>
                    <span className={classes.infoData}>{profile.about}</span>
                </div>
            </div>
            <div className={classes.library}>
                <div className={classes.spacer}>
                    <h3>Library</h3>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Looking for: </span>
                    <span className={classes.infoData}>{profile.looking_for}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Trading: </span>
                    <span className={classes.infoData}>{profile.trading_titles}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Games owned: </span>
                    <span className={classes.infoData}>{profile.games_owned}</span>
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