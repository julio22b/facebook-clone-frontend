import React, { useState } from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Friends({ friends }) {
    const [userFriends, setUserFriends] = useState(
        friends || [
            { first_name: 'mario', last_name: 'mario' },
            { first_name: 'algo', last_name: 'algo' },
            { first_name: 'yeah', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'yeah' },
            { first_name: 'alejandro', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'bermudez' },
        ],
    );

    return (
        <section className="user-friends">
            <h2>
                Friends <button>See All</button>
            </h2>
            <p>{userFriends.length} friends</p>
            <div>
                {userFriends.map((friend) => (
                    <figure>
                        <img src={friend.profile_picture || defaultPicture} alt="" />
                        <figcaption>{`${friend.first_name} ${friend.last_name}`}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
