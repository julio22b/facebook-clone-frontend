import React from 'react';
import Logo from '../../images/facebook-logo-small.png';
import { Link } from 'react-router-dom';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Header({ username, profile_picture, user_id }) {
    return (
        <header className="home-header">
            <div>
                <img src={Logo} alt="" />
                <input type="search" />
            </div>
            <Link to={`/users/${user_id}/timeline`}>
                <ul>
                    <li>
                        <img src={profile_picture || defaultPicture} alt="" />
                    </li>
                    <li>{username}</li>
                </ul>
            </Link>
        </header>
    );
}
