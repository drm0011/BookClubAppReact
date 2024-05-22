import React, { useState, useEffect } from "react";
import WebSocketChatService from "./WebSocketChatService";
import './ReadingListPage.css'; // Assuming you want to keep all styles in one file

const Chat = () => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        WebSocketChatService.connect("wss://localhost:7129/chat");
        WebSocketChatService.socket.onmessage = (event) => {
            setChatHistory((prevHistory) => [...prevHistory, event.data]);
        };
    }, []);

    const handleSendMessage = () => {
        WebSocketChatService.sendMessage(message);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {chatHistory.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
