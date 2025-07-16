import React from 'react';

export default function ChatInput() {
    return (
        <div className="chat-input-area">
            <button className="chat-attach-button">📎</button>
            <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
            />
            <button className="chat-send-button">Send</button>
        </div>
    );
}
