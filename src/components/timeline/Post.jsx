import React, { useState, useRef } from 'react';
import headers from '../../services/headers';
import PostComments from './PostComments';
import Reactions from './Reactions';

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
    const [showReactionsBox, setshowReactionsBox] = useState(false);

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
        setPostComments((comments) => comments.concat(data));
        setCommentCount(postComments.length + 1);
        console.log(data);
    };

    const commentInput = useRef();
    const focusCommentInput = () => {
        commentInput.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        commentInput.current.focus();
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
                <div className="like" id="like-btn">
                    <Reactions post_id={post_id} user_id={currentUser} />
                    <i></i>Like
                </div>
                <button className="comment" onClick={focusCommentInput}>
                    <i></i>Comment
                </button>
            </div>
            <PostComments comments={postComments} />
            <form onSubmit={(e) => createComment(e)}>
                <img src="" alt="" />
                <input
                    type="text"
                    required
                    placeholder="Write a comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    ref={commentInput}
                />
                <button>Comment</button>
            </form>
        </article>
    );
}
