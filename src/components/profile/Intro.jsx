import React from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Intro({ name, bio, cover_photo, profile_picture }) {
    return (
        <section className="intro">
            <div className="user-images">
                <img src={cover_photo} alt="" className="cover-photo" />
                <img src={profile_picture || defaultPicture} alt="" className="profile-picture" />
            </div>
            <article>
                <h1>{name}</h1>
                <p>{bio}</p>
                <button type="button">Edit profile</button>
            </article>
        </section>
    );
}
