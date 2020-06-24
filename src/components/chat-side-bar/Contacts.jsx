import React, { useEffect } from 'react';
import Friend from './Friend';
import io from 'socket.io-client';

export default function Contacts({ currentUser }) {
    const socket = io.connect('http://localhost:4000', {
        transports: ['websocket', 'polling', 'flashsocket'],
    });

    useEffect(() => {
        socket.emit('connection', currentUser._id);
    }, [currentUser._id, socket]);

    return (
        <section className="contacts-chat">
            <h3>Contacts</h3>
            {currentUser.friends &&
                currentUser.friends.map((friend) => (
                    <Friend
                        friend={friend}
                        key={friend._id}
                        socket={socket}
                        currentUserID={currentUser._id}
                    />
                ))}
        </section>
    );
}
