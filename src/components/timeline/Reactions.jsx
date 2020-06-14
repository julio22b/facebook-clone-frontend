import React from 'react';
import like from '../../images/like-reaction.png';
import love from '../../images/love.png';
import haha from '../../images/haha.png';
import wow from '../../images/wow.png';
import sad from '../../images/sad.png';
import angry from '../../images/angry.png';

export default function Reactions() {
    return (
        <div className="box">
            <button className="reaction-like">
                <img src={like} alt="" />
                <span className="legend-reaction">Like</span>
            </button>
            <button className="reaction-love">
                <img src={love} alt="" />
                <span className="legend-reaction">Love</span>
            </button>
            <button className="reaction-haha">
                <img src={haha} alt="" />
                <span className="legend-reaction">Haha</span>
            </button>
            <button className="reaction-wow">
                <img src={wow} alt="" />
                <span className="legend-reaction">Wow</span>
            </button>
            <button className="reaction-sad">
                <img src={sad} alt="" />
                <span className="legend-reaction">Sad</span>
            </button>
            <button className="reaction-angry">
                <img src={angry} alt="" />
                <span className="legend-reaction">Angry</span>
            </button>
        </div>
    );
}
