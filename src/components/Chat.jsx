import React, { useState, useEffect } from 'react';
import { sendMessage, onReceiveMessage, cleanupConnection } from '../services/signalrService';
import { getChatHistory } from './APIService';
import './ReadingListPage.css';

const Chat = ({ readingListId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("User");

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const chatHistory = await getChatHistory(readingListId);
                setMessages(chatHistory);
            } catch (err) {
                console.error("Failed to fetch chat history:", err);
            }
        };

        const handleReceiveMessage = (user, message, readingListId) => {
            setMessages(prevMessages => [...prevMessages, { sender: user, message: message, readingListId: readingListId }]);
        };

        fetchChatHistory();
        onReceiveMessage(handleReceiveMessage);

        return () => {
            cleanupConnection();
        };
    }, [readingListId]);

    const handleSendMessage = () => {
        const chatMessageDto = {
            sender: user,
            message: message,
            readingListId: readingListId // Ensure this prop is passed correctly
        };
        sendMessage(chatMessageDto.sender, chatMessageDto.message, chatMessageDto.readingListId);
        setMessage("");
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><strong>{msg.sender}:</strong> {msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
