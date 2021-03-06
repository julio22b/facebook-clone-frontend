import React, { useState, useEffect, useRef } from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function ChatBubble({
    showChatBubble,
    setShowChatBubble,
    friend,
    inputRef,
    socket,
    active,
    currentUserID,
}) {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const msgsRef = useRef();
    const chatIdentifier = [friend._id, currentUserID];

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send_message', {
            to: friend._id,
            message,
            from: currentUserID,
            chatIdentifier,
        });
        setChatMessages(
            chatMessages.concat({ to: friend._id, message, from: currentUserID, chatIdentifier }),
        );
        setMessage('');
    };

    useEffect(() => {
        socket.on('new_message', (message) => {
            console.log(message);
            if (
                message.chatIdentifier.includes(friend._id) &&
                message.chatIdentifier.includes(currentUserID)
            ) {
                setChatMessages((prevState) => prevState.concat(message));
                msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
                setShowChatBubble(true);
            }
        });

        return () => {
            socket.off('send_message');
        };
    }, [socket, setShowChatBubble, currentUserID, friend._id]);

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
                <div className="messages" ref={msgsRef}>
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
                        minLength="1"
                    />
                    <button></button>
                </form>
            </div>
        );
    }
    return;
}
