import React from 'react';
import Header from './Header';
import defaultPicture from '../../images/no-profile-picture.png';
import { Link } from 'react-router-dom';

export default function SearchPeople({ currentUser, logOut, location }) {
    const people = location.state.searchResult;
    return (
        <>
            <Header
                username={currentUser.first_name}
                profile_picture={currentUser.profile_picture}
                user_id={currentUser._id}
                full_name={`${currentUser.first_name} ${currentUser.last_name}`}
                friend_requests={currentUser.friend_requests}
                logOut={logOut}
            />
            <section className="search-people">
                <h2>People</h2>
                {people.length > 0 ? (
                    people.map((person) => (
                        <figure key={person._id}>
                            <Link to={`/users/${person._id}/profile`}>
                                <img src={person.profile_picture || defaultPicture} alt="" />
                                <figcaption>{`${person.first_name} ${person.last_name}`}</figcaption>
                            </Link>
                        </figure>
                    ))
                ) : (
                    <p>No users found. Try another name.</p>
                )}
            </section>
        </>
    );
}
