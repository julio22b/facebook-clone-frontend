import React from 'react';

export default function Notifications({ showNotifications }) {
    return (
        <div
            className={showNotifications ? 'notifications-modal active' : 'notifications-modal'}
        ></div>
    );
}
