import React from 'react';
import Logo from '../../images/facebook-logo-small.png';
import { Link } from 'react-router-dom';

export default function Header({ username, profile_picture, user_id }) {
    return (
        <header className="home-header">
            <div>
                <img src={Logo} alt="" />
                <input type="search" />
            </div>
            <Link to={`/users/${user_id}/profile`}>
                <ul>
                    <li>
                        <img src="" alt="" />
                    </li>
                    <li>{username}</li>
                </ul>
            </Link>
        </header>
    );
}
