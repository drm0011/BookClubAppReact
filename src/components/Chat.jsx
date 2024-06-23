import React, { useState, useEffect } from 'react';
import { sendMessage, onReceiveMessage, cleanupConnection } from '../services/signalrService';
import { getChatHistory } from './APIService';
import './Chat.css';

const Chat = ({ readingListId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Retrieve user information from localStorage
        const loggedInUser = localStorage.getItem('username') || 'Anonymous';
        setUser(loggedInUser);

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
        if (message.trim() === "") {
            setErrorMessage("Message cannot be empty");
            return;
        }
        setErrorMessage("");

        const chatMessageDto = {
            sender: user,
            message: message,
            readingListId: readingListId
        };
        sendMessage(chatMessageDto.sender, chatMessageDto.message, chatMessageDto.readingListId);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <h1>Comments</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="chat-input-container">
                <input
                    type="text"
                    value={user}
                    readOnly
                    className="chat-input"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-button">Send</button>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
