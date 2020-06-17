import React, { useState } from 'react';
import Logo from '../../images/facebook-logo-small.png';
import { Link } from 'react-router-dom';
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

    return (
        <header className="home-header">
            <div>
                <img src={Logo} alt="" />
                <input type="search" placeholder="Search People" />
            </div>
            <ul>
                <Link to={`/users/${user_id}/timeline`}>
                    <li>
                        <img src={profile_picture || defaultPicture} alt="" />
                    </li>
                    <li>{username}</li>
                </Link>
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
