import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatWindow({ selectedChat, messages }) {
    return (
        <div className="chat-window">
            <ChatHeader selectedChat={selectedChat} />
            <ChatMessages messages={messages} />
            <ChatInput />
        </div>
    );
}
