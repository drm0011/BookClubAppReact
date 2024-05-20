// src/Chat.jsx
import React, { useState, useEffect } from "react";
import WebSocketChatService from "./WebSocketChatService";

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
        <div>
            <div>
                {chatHistory.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
