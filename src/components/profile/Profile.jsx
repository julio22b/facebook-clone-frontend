import React, { useState, useEffect } from 'react';
import headers from '../../services/headers';
import Header from '../timeline/Header';
import Intro from './Intro';
import UserPosts from './UserPosts';
import Friends from './Friends';

export default function Profile({ match, currentUser, logOut }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`, {
                mode: 'cors',
                headers: headers(),
            });
            const userData = await response.json();
            setUser(userData);
        };
        getUser();
    }, [match.params.id]);

    return (
        <>
            <Header
                username={currentUser.first_name}
                full_name={`${currentUser.first_name} ${currentUser.last_name}`}
                user_id={currentUser._id}
                profile_picture={currentUser.profile_picture}
                friend_requests={user.friend_requests}
                logOut={logOut}
            />
            <section className="profile">
                <Intro
                    first_name={user.first_name || ''}
                    last_name={user.last_name || ''}
                    bio={user.bio}
                    cover_photo={user.cover_photo}
                    profile_picture={user.profile_picture}
                    notLoggedInUser={match.params.id}
                    currentUser={currentUser._id}
                />
                <div className="cols-wrapper">
                    <Friends friends={user.friends} />
                    <UserPosts currentUser={user._id} profile_picture={user.profile_picture} />
                </div>
            </section>
        </>
    );
}
