import React, { useState, useEffect } from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function ChatBubble({
    showChatBubble,
    setShowChatBubble,
    friend,
    inputRef,
    io,
    active,
    currentUserID,
}) {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const sendMessage = (e) => {
        e.preventDefault();
        io.emit('message', { friend, message });
        setMessage('');
    };

    useEffect(() => {
        io.on('message', (message) => {
            setChatMessages((prevState) => chatMessages.concat(message));
        });
    }, [io, chatMessages]);

    if (friend) {
        return (
            <div className={showChatBubble ? 'chat open' : 'chat close'}>
                <div className="friend-info">
                    <figure>
                        <img src={friend.profile_picture || defaultPicture} alt="" />
                        <figcaption>
                            <p>{`${friend.first_name} ${friend.last_name}`}</p>
                            <p>{active && 'Active Now'}</p>
                        </figcaption>
                    </figure>
                    <button type="button" onClick={() => setShowChatBubble(!showChatBubble)}>
                        X
                    </button>
                </div>
                <div className="messages">
                    {chatMessages.map((msg, index) => (
                        <p
                            key={index}
                            className={msg.id !== currentUserID ? 'message' : 'message other'}
                        >
                            {msg.message}
                        </p>
                    ))}
                </div>
                <form onSubmit={(e) => sendMessage(e)}>
                    <input
                        type="text"
                        placeholder="Aa"
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button></button>
                </form>
            </div>
        );
    }
    return;
}
