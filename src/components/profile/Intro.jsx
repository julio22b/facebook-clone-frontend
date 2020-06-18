import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Intro({
    first_name,
    last_name,
    bio,
    cover_photo,
    profile_picture,
    notLoggedInUser,
    currentUser,
}) {
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);
    const switchFormState = () => {
        setShowEditProfileForm(!showEditProfileForm);
    };
    return (
        <section className="intro">
            <div className="user-images">
                <img src={cover_photo} alt="" className="cover-photo" />
                <img src={profile_picture || defaultPicture} alt="" className="profile-picture" />
            </div>
            <article>
                <h1>{`${first_name} ${last_name}`}</h1>
                <p>{bio}</p>
                {notLoggedInUser !== currentUser ? (
                    ''
                ) : (
                    <>
                        <button type="button" onClick={switchFormState}>
                            Edit profile
                        </button>
                        <EditProfileForm
                            showEditForm={showEditProfileForm}
                            handleClick={switchFormState}
                            userBio={bio}
                            image={profile_picture}
                            cover={cover_photo}
                            userFirstName={first_name}
                            userLastName={last_name}
                            currentUser={currentUser}
                        />
                    </>
                )}
            </article>
        </section>
    );
}
