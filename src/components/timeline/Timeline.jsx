import React, { useEffect, useState } from 'react';
import headers from '../../services/headers';
import Header from './Header';
import PostList from './PostList';
import FindPeople from '../friends-side-bar/FindPeople';
import Groups from '../groups/Groups';
import Contacts from '../chat-side-bar/Contacts';
import io from 'socket.io-client';

export default function Timeline({ match, logOut }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`/users/${match.params.id}`, {
                    headers: headers(),
                });
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, [match.params.id]);

    const socket = io.connect('', {
        transports: ['websocket', 'polling', 'flashsocket'],
    });

    useEffect(() => {
        socket.emit('connection', user._id);
        socket.on('connected_users', (usersArr) => {});
        return () => {
            socket.off('connected_users');
        };
    }, [user._id, socket]);

    return (
        <>
            <Header
                full_name={`${user.first_name} ${user.last_name}`}
                username={user.first_name}
                profile_picture={user.profile_picture}
                user_id={user._id}
                friend_requests={user.friend_requests}
                logOut={logOut}
            />
            <div className="container">
                <section className="left-col">
                    <Groups />
                </section>
                <section className="posts">
                    <PostList currentUser={user} socket={socket} />
                </section>
                <section className="right-col">
                    <FindPeople currentUser={user} />
                    <Contacts currentUser={user} socket={socket} />
                </section>
            </div>
        </>
    );
}
