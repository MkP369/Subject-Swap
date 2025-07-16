import React from 'react';
import ChatMessage from './ChatMessage';

export default function ChatMessages({ messages }) {
    return (
        <div className="chat-messages">
            {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
            ))}
        </div>
    );
}
