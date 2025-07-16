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
                    <img src={chat.avatar} alt={chat.username} className="chat-avatar" />
                    <span className="chat-username">{chat.username}</span>
                </div>
            ))}
        </div>
    );
}
