import React from 'react';

export default function Intro({ name, bio }) {
    return (
        <section className="intro">
            <div className="user-images">
                <img src="" alt="" className="cover-photo" />
                <img src="" alt="" className="profile-picture" />
            </div>
            <article>
                <h1>{name}</h1>
                <p>{bio}</p>
            </article>
        </section>
    );
}
