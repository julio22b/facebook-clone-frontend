import React from 'react';
import Friend from './Friend';

export default function Contacts({ currentUser }) {
    const openChat = () => {
        const a = 2;
    };
    return (
        <section className="contacts-chat">
            <h3>Contacts</h3>
            {currentUser.friends && currentUser.friends.map((friend) => <Friend friend={friend} />)}
        </section>
    );
}
