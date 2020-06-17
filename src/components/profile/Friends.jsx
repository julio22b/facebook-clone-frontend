import React, { useState } from 'react';
import defaultPicture from '../../images/no-profile-picture.png';

export default function Friends({ friends }) {
    const [userFriends, setUserFriends] = useState(
        friends || [
            { first_name: 'mario', last_name: 'mario' },
            { first_name: 'algo', last_name: 'algo' },
            { first_name: 'juan', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'ramirez' },
            { first_name: 'yeah', last_name: 'bermudez' },
            { first_name: 'andrea', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'azul' },
            { first_name: 'alejandro', last_name: 'yeah' },
            { first_name: 'yeah', last_name: 'mo' },
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
                    <figure key={`${friend.first_name} ${friend.last_name}`}>
                        <img src={friend.profile_picture || defaultPicture} alt="" />
                        <figcaption>{`${friend.first_name} ${friend.last_name}`}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
