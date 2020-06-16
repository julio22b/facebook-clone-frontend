import React, { useState, useEffect } from 'react';
import headers from '../../services/headers';
import Header from '../timeline/Header';
import Intro from './Intro';

export default function Profile({ match }) {
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
                username={user.first_name}
                user_id={user._id}
                profile_picture={user.profile_picture}
            />
            <section className="profile">
                <Intro name={`${user.first_name} ${user.last_name}`} bio={user.bio} />
            </section>
        </>
    );
}
