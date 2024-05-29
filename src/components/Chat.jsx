import React, { useState, useEffect } from 'react';
import { sendMessage, onReceiveMessage, cleanupConnection } from '../services/signalrService';
import './ReadingListPage.css'; 

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("User");

    useEffect(() => {
        const handleReceiveMessage = (user, message) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
        };

        onReceiveMessage(handleReceiveMessage);

        return () => {
            cleanupConnection();
        };
    }, []);

    const handleSendMessage = () => {
        sendMessage(user, message);
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
                    <li key={index}><strong>{msg.user}:</strong> {msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
