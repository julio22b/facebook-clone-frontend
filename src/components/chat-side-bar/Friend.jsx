import React, { useState } from 'react';
import defaultPicture from '../../images/no-profile-picture.png';
import ChatBubble from './ChatBubble';

export default function Friend({ friend }) {
    const [showChatBubble, setShowChatBubble] = useState(false);
    return (
        <div className="info-chat-wrapper">
            <figure key={friend._id} onClick={() => setShowChatBubble(!showChatBubble)}>
                <img src={friend.profile_picture || defaultPicture} alt="" />
                <figcaption>{`${friend.first_name} ${friend.last_name}`}</figcaption>
            </figure>
            <ChatBubble
                friend={friend}
                setShowChatBubble={setShowChatBubble}
                showChatBubble={showChatBubble}
            />
        </div>
    );
}
