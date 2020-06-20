import React, { useState } from 'react';
import headers from '../../services/headers';
import defaultPicture from '../../images/no-profile-picture.png';
import { Link } from 'react-router-dom';

export default function Person({
    current_user_id,
    first_name,
    last_name,
    profile_picture,
    person_id,
    btnText,
}) {
    const [requestStatus, setRequestStatus] = useState('');

    const sendFriendRequest = async () => {
        const response = await fetch(
            `http://localhost:4000/users/friend-request/${current_user_id}/send/${person_id}`,
            { method: 'post', mode: 'cors', headers: headers() },
        );
        const data = await response.json();

        console.log(data);
        setRequestStatus(data.message);
    };

    return (
        <article>
            <Link to={`/users/${person_id}/profile`}>
                <img src={profile_picture || defaultPicture} alt="" />
            </Link>
            <div>
                <Link to={`/users/${person_id}/profile`}>
                    <p>{`${first_name} ${last_name}`}</p>
                </Link>
                <button type="button" onClick={sendFriendRequest}>
                    {requestStatus || btnText}
                </button>
            </div>
        </article>
    );
}
