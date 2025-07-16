import React from 'react';

export default function ChatMessage({ message }) {
    return (
        <div className={`chat-message ${message.sender === 'me' ? 'chat-message-me' : 'chat-message-other'}`}>
            <div className="chat-message-content">
                {message.type === 'text' ? (
                    <span className="chat-message-text">{message.text}</span>
                ) : (
                    <a href="#" className="chat-message-file">{message.fileName}</a>
                )}
            </div>
            <div className="chat-message-time">{message.time}</div>
        </div>
    );
}
