// ChatApp.jsx

import React, { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';  
import { apiBaseUrl } from '../../config'
import './ChatApp.css';

// WebSocket for managing a connection to our Go/Gin server 
// WebSocket client (web)    - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
// WebSocket server (Go/Gin) - https://pkg.go.dev/github.com/gorilla/websocket@v1.5.1 

const ChatApp = () => {
    const [websocket, setWebsocket] = useState(null);       // For caching websocket we cal also use `userRef` 
    const [messages, setMessages] = useState([]);           // User and server messages 
    const [inputMessage, setInputMessage] = useState('');  
    const [isLoading, setIsLoading] = useState(false);         

    useEffect(() => {
        const socket = new WebSocket(GetWebSocketUrl());
        socket.onopen = () => {
            console.log('Websocket Connected');
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const serverMessage = { 
                text: event.data, 
                sender: 'server', 
                time: formatTime(new Date())  
            };

            // Shallow copy of the `messages` state variable (shallow copy is well suited for the plain text message array )  
            setMessages(prevMessages => [...prevMessages, serverMessage]);
            // Hide loading icon when response is received
            setIsLoading(false); 
        };

        socket.onclose = () => {
            console.log('Websocket Disconnected');
        };

        socket.onerror = (error) => {
            console.error('Websocket Error:', error);
        };

        setWebsocket(socket);

        // Close websocket on an unmount  
        return () => {
            socket.close();
        };
    }, []);

    let GetWebSocketUrl = () => {
        const websocketProtocol = apiBaseUrl.startsWith("https") ? "wss" : "ws";
        const wsUrl = `${websocketProtocol}://${apiBaseUrl.replace(/^https?:\/\//, "")}/ws`;
        console.log(`ws URL: ${wsUrl}`);
        return wsUrl;
    }

    const sendMessage = () => {
        if (websocket && websocket.readyState === WebSocket.OPEN && inputMessage) {
            websocket.send(inputMessage);
            const userMessage = { 
                text: inputMessage, 
                sender: 'user', 
                time: formatTime(new Date())
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            // Clear input field after sending and display the loading icon (this is oversimplified)
            setInputMessage(''); 
            setIsLoading(true);  
        }
    };

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="chat-app">
        <div className="chat-content">
            {messages.map((message, index) => (
                <div key={index} className={`chat-bubble ${message.sender}`}>
                    {message.text}
                    <div className="message-time">{message.time}</div>
                </div>
            ))}
            {isLoading && (
                <div className="loading-icon-container">
                   <FaEllipsisH className="loading-icon" />
               </div>
            )}
        </div>
        <div className="chat-input">
            <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    </div>
    );
};

export default ChatApp;