import React from 'react';
import Friend from './Friend';
import socket from 'socket.io-client';

export default function Contacts({ currentUser }) {
    const io = socket.connect('http://localhost:4000', {
        transports: ['websocket', 'polling', 'flashsocket'],
    });
    return (
        <section className="contacts-chat">
            <h3>Contacts</h3>
            {currentUser.friends &&
                currentUser.friends.map((friend) => (
                    <Friend
                        friend={friend}
                        key={friend._id}
                        io={io}
                        currentUserID={currentUser._id}
                    />
                ))}
        </section>
    );
}
