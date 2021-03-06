import React, { useState, useRef } from 'react';
import EditProfileForm from './EditProfileForm';
import defaultPicture from '../../images/no-profile-picture.png';
import editIcon from '../../images/edit.png';
import headers from '../../services/headers';

export default function Intro({
    first_name,
    last_name,
    bio,
    cover_photo,
    profile_picture,
    notLoggedInUser,
    currentUser,
    friends,
    friend_requests,
}) {
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);
    const [addFriendBtnText, setAddFriendBtnText] = useState('Add friend');

    const isCurrentUserFriend = friends && friends.some((friend) => friend._id === notLoggedInUser);

    const hasSentRequest =
        friend_requests && friend_requests.some((fr) => fr.to._id === notLoggedInUser);

    const addFriendRef = useRef();
    const switchFormState = () => {
        setShowEditProfileForm(!showEditProfileForm);
    };
    const sendFriendRequest = async () => {
        try {
            const response = await fetch(
                `/api/users/friend-request/${currentUser}/send/${notLoggedInUser}`,
                { method: 'post', mode: 'cors', headers: headers() },
            );
            const data = await response.json();
            if (response.status === 200) {
                addFriendRef.current.disabled = true;
                setAddFriendBtnText(data.message);
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <section className="intro">
            <div className="user-images">
                <div className="cover-photo-container">
                    <img src={cover_photo} alt="" className="cover-photo" />
                </div>
                <img src={profile_picture || defaultPicture} alt="" className="profile-picture" />
            </div>
            <article>
                <h1>{`${first_name} ${last_name}`}</h1>
                <p>
                    <strong>Bio: </strong>
                    {bio}
                </p>
                {!isCurrentUserFriend &&
                    notLoggedInUser !== currentUser &&
                    !hasSentRequest &&
                    hasSentRequest !== undefined && (
                        <button
                            className="add-friend"
                            type="button"
                            onClick={sendFriendRequest}
                            ref={addFriendRef}
                        >
                            {addFriendBtnText}
                        </button>
                    )}
                {notLoggedInUser !== currentUser ? (
                    ''
                ) : (
                    <>
                        <button type="button" onClick={switchFormState}>
                            <img src={editIcon} alt="" />
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
