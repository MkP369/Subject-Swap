import React from 'react';

export default function ChatSidebar({ chats, selectedChat, onSelectChat }) {
    return (
        <div className="chat-sidebar">
            {chats.map(chat => (
                <div
                    key={chat.id}
                    className={`chat-list-item ${selectedChat.id === chat.id ? 'active' : ''}`}
                    onClick={() => onSelectChat(chat)}
                >
                    {chat.avatar ? (
                        <img src={chat.avatar} alt={chat.username} className="chat-avatar" />
                    ) : (
                        <div className="chat-avatar-placeholder">{chat.username.charAt(0)}</div>
                    )}
                    <span className="chat-username">{chat.username}</span>
                </div>
            ))}
        </div>
    );
}
