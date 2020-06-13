import React, { useState } from 'react';
import headers from '../../services/headers';
import PostComments from './PostComments';

export default function Post({
    post_id,
    user,
    profile_picture,
    content,
    image,
    comments,
    reactions,
    timestamp,
    currentUser,
}) {
    const [postComments, setPostComments] = useState(comments);
    const [commentsCount, setCommentCount] = useState(comments.length || 0);
    const [comment, setComment] = useState('');

    const createComment = async (e) => {
        e.preventDefault();
        const newComment = {
            content: comment,
            user_id: currentUser,
        };
        const response = await fetch(`http://localhost:4000/posts/${post_id}/comment`, {
            method: 'put',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(newComment),
        });
        const data = await response.json();
        setComment('');
        setPostComments(comments.concat(data));
        setCommentCount(postComments.length);
        console.log(data);
    };

    return (
        <article>
            <figure className="user-info">
                <img src="" alt="" />
                <figcaption>
                    <p className="username">{user}</p>
                    <p className="post-date">{timestamp}</p>
                </figcaption>
            </figure>
            <figure className="post-content">
                <img src="" alt="" />
                <figcaption>{content}</figcaption>
            </figure>
            <div className="reactions-comment-count">
                <p className="reactions">reactions here</p>
                <p className="comment-count">
                    {commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`}
                </p>
            </div>
            <div className="like-comment-buttons">
                <button className="like">Like</button>
                <button className="comment">Comment</button>
            </div>
            <PostComments comments={postComments} />
            <form onSubmit={(e) => createComment(e)}>
                <img src="" alt="" />
                <input
                    type="text"
                    required
                    placeholder="Write a comment..."
                    onChange={(e) => setComment(e.target.value)}
                />
                <button>Comment</button>
            </form>
        </article>
    );
}
