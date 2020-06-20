import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/facebook-logo-small.png';
import home from '../../images/home.png';
import defaultPicture from '../../images/no-profile-picture.png';
import Account from './Account';
import Notifications from './Notifications';

export default function Header({
    username,
    profile_picture,
    user_id,
    full_name,
    friend_requests,
    logOut,
}) {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const switchNotifModalState = () => {
        setShowNotifications(!showNotifications);
        setShowAccountSettings(false);
    };

    const switchAccModalState = () => {
        setShowAccountSettings(!showAccountSettings);
        setShowNotifications(false);
    };

    /* const searchPeople = async (e)=> {
            const response = await fetch(
                `http://localhost:4000/users/${currentUser._id}/new-people?limit=20`,
                { headers: headers(), mode: 'cors' },
            );
            const nonFriends = await response.json();
            setPeople(nonFriends);
    } */

    return (
        <header className="home-header">
            <form>
                <img src={Logo} alt="" />
                <input type="search" placeholder="Search People" />
                <button>Hide This</button>
            </form>
            <div></div>
            <ul>
                <Link to={`/users/${user_id}/profile`}>
                    <li>
                        <img src={profile_picture || defaultPicture} alt="" />
                    </li>
                    <li>{username}</li>
                </Link>
                <li>
                    <Link to={`/users/${user_id}/timeline`}>
                        <img src={home} alt="" />
                    </Link>
                </li>
                <li className="notifications" onClick={switchNotifModalState}>
                    <i></i>
                    <span>Notifications</span>
                </li>
                <li className="account" onClick={switchAccModalState}>
                    <i></i>
                    <span>Account</span>
                </li>
            </ul>
            <Account
                name={full_name}
                profile_picture={profile_picture || defaultPicture}
                user_id={user_id}
                showAccountSettings={showAccountSettings}
                logOut={logOut}
            />
            <Notifications
                showNotifications={showNotifications}
                friend_requests={friend_requests}
            />
        </header>
    );
}
