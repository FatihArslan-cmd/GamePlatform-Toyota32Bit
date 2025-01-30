 // utils/webSocketManager.js
 import { useState, useEffect, useRef } from 'react';

 export const useWebSocket = (url) => {
     const [messageQueue, setMessageQueue] = useState([]);
     const socketRef = useRef(null);
 
     useEffect(() => {
         socketRef.current = new WebSocket(url);
 
         socketRef.current.onopen = () => {
             console.log('WebSocket connection opened');
         };
 
         socketRef.current.onmessage = (event) => {
             try {
                 const parsedMessage = JSON.parse(event.data);
                 setMessageQueue((prev) => [...prev, parsedMessage]);
             } catch (error) {
                 console.error('Error parsing WebSocket message:', error);
             }
         };
 
         socketRef.current.onerror = (error) => {
             console.error('WebSocket error:', error);
         };
 
         socketRef.current.onclose = (event) => {
             console.log('WebSocket connection closed:', event);
         };
 
         return () => {
             if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                 socketRef.current.close();
             }
         };
     }, [url]);
 
     const sendMessage = (message) => {
         if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
             socketRef.current.send(JSON.stringify(message));
         } else {
             console.warn('WebSocket is not open. Message not sent.');
         }
     };
     return { sendMessage, messageQueue };
 };