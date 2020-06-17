/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

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
                    <img src="darkmode" alt="" />
                    <p>Dark mode</p>
                </div>
            </a>
            <div className="border"></div>
            <Link to="/users/log-in">
                <button className="option" onClick={logOut}>
                    <img src="logout" alt="" />
                    <p>Log out</p>
                </button>
            </Link>
        </div>
    );
}
