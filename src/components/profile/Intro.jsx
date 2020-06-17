import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Intro({
    name,
    bio,
    cover_photo,
    profile_picture,
    notLoggedInUser,
    currentUser,
}) {
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);
    const showForm = () => {
        setShowEditProfileForm(!showEditProfileForm);
    };
    return (
        <section className="intro">
            <div className="user-images">
                <img src={cover_photo} alt="" className="cover-photo" />
                <img src={profile_picture || defaultPicture} alt="" className="profile-picture" />
            </div>
            <article>
                <h1>{name}</h1>
                <p>{bio}</p>
                {notLoggedInUser !== currentUser ? (
                    ''
                ) : (
                    <>
                        <button type="button">Edit profile</button>
                        <EditProfileForm />
                    </>
                )}
            </article>
        </section>
    );
}
