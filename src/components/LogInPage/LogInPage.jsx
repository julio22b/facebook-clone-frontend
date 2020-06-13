import React from 'react';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Map from './Map';
import facebookLogo from '../../images/facebook-logo.png';

export default function LogInHeader() {
    return (
        <>
            <header classname="log-in-page-header">
                <div>
                    <img src={facebookLogo} alt="facebook-logo" className="facebook-logo" />
                </div>
                <LogInForm />
            </header>
            <section className="sign-up-map-container">
                <Map />
                <SignUpForm />
            </section>
        </>
    );
}
