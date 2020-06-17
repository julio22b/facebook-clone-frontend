import React, { useState, useEffect } from 'react';
import headers from '../../services/headers';
import Header from '../timeline/Header';
import Intro from './Intro';
import UserPosts from './UserPosts';
import Friends from './Friends';

export default function Profile({ match, currentUser }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`, {
                mode: 'cors',
                headers: headers(),
            });
            const userData = await response.json();
            setUser(userData);
            console.log(userData);
        };
        getUser();
    }, [match.params.id]);

    return (
        <>
            <Header
                username={currentUser.first_name}
                user_id={currentUser._id}
                profile_picture={currentUser.profile_picture}
            />
            <section className="profile">
                <Intro name={`${user.first_name} ${user.last_name}`} bio={user.bio} />
                <div className="cols-wrapper">
                    <Friends friends={user.friends} />
                    <UserPosts user_id={user._id} profile_picture={user.profile_picture} />
                </div>
            </section>
        </>
    );
}
