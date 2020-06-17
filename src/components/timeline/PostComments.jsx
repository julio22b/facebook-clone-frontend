import React from 'react';
import defaultPicture from '../../images/no-profile-picture.png';
import { Link } from 'react-router-dom';

export default function PostComments({ comments }) {
    return (
        <div className="comments">
            {comments.map((comment) => (
                <Link to={`/users/${comment.user._id}/profile`} key={comment._id}>
                    <figure>
                        <img src={comment.user.profile_picture || defaultPicture} alt="" />
                        <figcaption>
                            <p className="username">{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                            <p className="content">{comment.content}</p>
                        </figcaption>
                        <p className="timestamp">{comment.timestamp}</p>
                    </figure>
                </Link>
            ))}
        </div>
    );
}
