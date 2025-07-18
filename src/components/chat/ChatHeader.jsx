import React, { useState } from 'react';

export default function ChatHeader({ selectedChat }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="chat-header">
            {selectedChat.avatar ? (
                <img src={selectedChat.avatar} alt={selectedChat.username} className="chat-header-avatar" />
            ) : (
                <div className="chat-header-avatar-placeholder">{selectedChat.username.charAt(0)}</div>
            )}
            <button className="chat-header-username">{selectedChat.username}</button>
            <div className="chat-header-menu">
                <button
                    className="chat-header-menu-button"
                    onClick={() => setShowMenu(!showMenu)}
                >⋯</button>
                {showMenu && (
                    <div className="chat-header-menu-dropdown">
                        <button className="chat-header-menu-item">Report chat</button>
                        <button className="chat-header-menu-item">End chat</button>
                    </div>
                )}
            </div>
        </div>
    );
}
