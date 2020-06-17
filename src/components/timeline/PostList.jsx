import React, { useState, useEffect } from 'react';
import Post from './Post';
import headers from '../../services/headers';
import CreatePost from './CreatePost';

export default function PostList({ currentUser }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('http://localhost:4000/posts', { headers: headers() });
            const postsData = await response.json();
            setPosts(postsData);
        };
        getPosts();
    }, []);

    // NEED TO SORT POSTS!!!
    return (
        <>
            <CreatePost
                username={currentUser.first_name}
                profile_picture={currentUser.profile_picture}
                user_id={currentUser._id}
                setPosts={setPosts}
            />
            <section className="post-list">
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        post_id={post._id}
                        user={`${post.user.first_name} ${post.user.last_name}`}
                        user_id={post.user._id}
                        profile_picture={post.user.profile_picture}
                        content={post.content}
                        image={post.image}
                        comments={post.comments}
                        reactions={post.reactions}
                        timestamp={post.timestamp}
                        currentUser={currentUser}
                    />
                ))}
            </section>
        </>
    );
}
