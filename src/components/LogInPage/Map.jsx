import React from 'react';
import shareMap from '../../images/log-in-map.png';

export default function Map() {
    /* const fblogin = async () => {
        const response = await fetch('http://localhost:4000/users/log-in/facebook', {
            mode: 'no-cors',
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
    }; */
    return (
        <article>
            <h3>Facebook helps you connect and share with the people in your life.</h3>
            <img src={shareMap} alt="" />
            {/* <button type="button" onClick={fblogin}>
                facebook log in
            </button> */}
        </article>
    );
}
