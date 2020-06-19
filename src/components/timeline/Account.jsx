/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import logOutIcon from '../../images/log-out.png';
import darkModeIcon from '../../images/dark-mode.png';

export default function Account({ name, user_id, profile_picture, showAccountSettings, logOut }) {
    return (
        <div className={showAccountSettings ? 'account-modal active' : 'account-modal'}>
            <Link to={`/users/${user_id}/profile`}>
                <figure>
                    <img src={profile_picture} alt="" />
                    <figcaption>
                        <p>{name}</p>
                        <p>See your profile</p>
                    </figcaption>
                </figure>
            </Link>
            <div className="border"></div>
            <a href="#">
                <div className="option">
                    <img src={darkModeIcon} alt="" />
                    <p>Dark mode</p>
                </div>
            </a>
            <Link to="/users/log-in">
                <button className="option" onClick={logOut}>
                    <img src={logOutIcon} alt="" />
                    <p>Log out</p>
                </button>
            </Link>
        </div>
    );
}
