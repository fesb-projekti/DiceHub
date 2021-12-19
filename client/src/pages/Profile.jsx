import classes from "./Profile.module.css";
import { useState, useEffect } from 'react'

function Profile() {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            const profileFromServer = await fetchProfile();
            setProfile(profileFromServer);
        }
        getProfile();
    }, [])

    const fetchProfile = async () => {
        const res = await fetch("http://localhost:3001/profile");
        const data = await res.json();
        return data;
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
            <div className={classes.spacer}>
                <h3>Personal information</h3>
            </div>
            <div className={classes.bio}>
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
                    <span className={classes.infoDesc}>About myself: </span>
                    <span className={classes.infoData}>{profile.about}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Location to play: </span>
                    <span className={classes.infoData}>{profile.has_location}</span>
                </div>
            </div>
            <div className={classes.spacer}>
                <h3>Library</h3>
            </div>
            <div className={classes.library}>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Games owned: </span>
                    <span className={classes.infoData}>{profile.games_owned}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Trading: </span>
                    <span className={classes.infoData}>{profile.trading_titles}</span>
                </div>
                <div className={classes.infoRow}>
                    <span className={classes.infoDesc}>Looking for: </span>
                    <span className={classes.infoData}>{profile.looking_for}</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;