import React from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function ChatBubble({ showChatBubble, setShowChatBubble, friend, active }) {
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
                <div className="messages"></div>
                <form>
                    <input type="text" placeholder="Aa" />
                    <button></button>
                </form>
            </div>
        );
    }
    return;
}
