import React, { useState, useEffect } from 'react';
import Post from '../timeline/Post';
import headers from '../../services/headers';

export default function UserPosts({ currentUser, profile_picture }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const abortCon = new AbortController();
        const signal = abortCon.signal;

        const getUserPosts = async () => {
            const response = await fetch(
                `http://localhost:4000/users/${currentUser}/profile/posts`,
                {
                    mode: 'cors',
                    headers: headers(),
                    signal,
                },
            );
            const userPosts = await response.json();
            setPosts(userPosts);
        };
        if (currentUser) {
            getUserPosts();
        }
        return function () {
            abortCon.abort();
        };
    }, [currentUser]);

    const deletePost = async (post_id, setShowPostActions) => {
        const response = await fetch(`http://localhost:4000/posts/${post_id}`, {
            method: 'delete',
            mode: 'cors',
            headers: headers(),
        });
        const data = await response.json();
        console.log(data);
        setPosts((prevState) => prevState.filter((post) => post._id !== post_id));
        setShowPostActions(false);
    };

    return (
        <>
            <div className="posts">
                <section className="post-list">
                    {posts.map((post) => (
                        <Post
                            key={post._id}
                            post_id={post._id}
                            user={`${post.user.first_name} ${post.user.last_name}`}
                            user_id={post.user._id}
                            profile_picture={profile_picture}
                            content={post.content}
                            image={post.image}
                            comments={post.comments}
                            reactions={post.reactions}
                            timestamp={post.timestamp}
                            currentUser={currentUser}
                            deletePost={deletePost}
                        />
                    ))}
                </section>
            </div>
        </>
    );
}
