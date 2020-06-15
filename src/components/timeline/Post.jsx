import React, { useState, useRef } from 'react';
import headers from '../../services/headers';
import PostComments from './PostComments';
import Reactions from './Reactions';
import like from '../../images/like-reaction.png';
import love from '../../images/love.png';
import haha from '../../images/haha.png';
import wow from '../../images/wow.png';
import sad from '../../images/sad.png';
import angry from '../../images/angry.png';

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
    const [postReactions, setPostReactions] = useState(reactions);

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

    const likes = postReactions.filter((reaction) => reaction.type === 'Like').length;
    const loves = postReactions.filter((reaction) => reaction.type === 'Love').length;
    const hahas = postReactions.filter((reaction) => reaction.type === 'Haha').length;
    const wows = postReactions.filter((reaction) => reaction.type === 'Wow').length;
    const sads = postReactions.filter((reaction) => reaction.type === 'Sad').length;
    const angrys = postReactions.filter((reaction) => reaction.type === 'Angry').length;
    const reactionCounts = [
        { type: likes, img: like, key: 1 },
        { type: loves, img: love, key: 2 },
        { type: hahas, img: haha, key: 3 },
        { type: wows, img: wow, key: 4 },
        { type: sads, img: sad, key: 5 },
        { type: angrys, img: angry, key: 6 },
    ];

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
                <ul className="reactions">
                    {reactionCounts.map(
                        (reaction) =>
                            !!reaction.type && (
                                <li key={reaction.key}>
                                    <img src={reaction.img} alt="" />
                                </li>
                            ),
                    )}
                    <li>{postReactions.length > 0 ? postReactions.length : ''}</li>
                </ul>
                <p className="comment-count">
                    {commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`}
                </p>
            </div>
            <div className="like-comment-buttons">
                <div className="like" id="like-btn">
                    <Reactions
                        post_id={post_id}
                        user_id={currentUser}
                        setPostReactions={setPostReactions}
                    />
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
