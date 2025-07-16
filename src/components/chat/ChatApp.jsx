import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import "../../styles/Chat.css"

export default function ChatApp() {
    const [selectedChat, setSelectedChat] = useState({
        id: 1,
        username: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
    });

    const chats = [
        { id: 1, username: 'John Doe', avatar: 'https://via.placeholder.com/40' },
        { id: 2, username: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
        { id: 3, username: 'Alice', avatar: 'https://via.placeholder.com/40' },
    ];

    const messages = [
        { id: 1, sender: 'me', text: 'Hey!', time: '10:00 AM', type: 'text' },
        { id: 2, sender: 'other', text: 'Hi there!', time: '10:01 AM', type: 'text' },
        { id: 3, sender: 'me', text: 'Check this file', time: '10:02 AM', type: 'file', fileName: 'report.pdf' },
    ];

    return (
        <div className="chat-app">
            <ChatSidebar
                chats={chats}
                selectedChat={selectedChat}
                onSelectChat={setSelectedChat}
            />
            <ChatWindow
                selectedChat={selectedChat}
                messages={messages}
            />
        </div>
    );
}
