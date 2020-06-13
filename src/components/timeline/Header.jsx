import React from 'react';
import Logo from '../../images/facebook-logo-small.png';

export default function Header({ username, profile_picture }) {
    return (
        <header className="home-header">
            <div>
                <img src={Logo} alt="" />
                <input type="search" />
            </div>
            <ul>
                <li>
                    <img src="" alt="" />
                </li>
                <li>{username}</li>
            </ul>
        </header>
    );
}
