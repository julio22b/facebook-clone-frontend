import React, { useState } from 'react';
import headers from '../../services/headers';

export default function Notifications({ showNotifications, friend_requests }) {
    const [acceptBtnText, setAcceptBtnText] = useState('Accept');
    const acceptRequest = async (fromUserID, toUserID) => {
        try {
            const response = await fetch(
                `http://localhost:4000/users/friend-request/${fromUserID}/accept/${toUserID}`,
                { method: 'put', mode: 'cors', headers: headers() },
            );
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setAcceptBtnText('Request accepted');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const pendingFrs = friend_requests
        ? friend_requests.filter((fr) => fr.status === 'Pending')
        : [];

    return (
        <div className={showNotifications ? 'notifications-modal active' : 'notifications-modal'}>
            <h3>Notifications</h3>
            {friend_requests &&
                pendingFrs.map((fr) => (
                    <article key={fr._id}>
                        <figure>
                            <img src={fr.from.profile_picture} alt="" />
                            <figcaption>
                                <strong>{`${fr.from.first_name} ${fr.from.last_name}`}</strong> has
                                sent you a friend request.
                            </figcaption>
                        </figure>
                        <div>
                            <button
                                className="accept-fr"
                                type="button"
                                onClick={() => acceptRequest(fr.from._id, fr.to._id)}
                            >
                                {acceptBtnText}
                            </button>
                            <button className="decline-fr" type="button">
                                Decline
                            </button>
                        </div>
                    </article>
                ))}
        </div>
    );
}
