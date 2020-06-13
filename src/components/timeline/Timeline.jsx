import React, { useEffect, useState } from 'react';
import headers from '../../services/headers';
import Header from './Header';
import CreatePost from './CreatePost';

export default function Timeline({ match }) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('http://localhost:4000/posts');
            const postsData = await response.json();
            setPosts(postsData);
        };
        getPosts();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`, {
                mode: 'cors',
                headers: headers(),
            });
            const userData = await response.json();
            setUser(userData);
        };
        getUser();
    }, [match.params.id]);

    return (
        <>
            <Header username={user.first_name} profile_picture={user.profile_picture} />
            <CreatePost
                username={user.first_name}
                profile_picture={user.profile_picture}
                user_id={user._id}
            />
            <PostList posts={posts} />
        </>
    );
}
