import React from 'react'
import ChatPage from './ChatPage'
import { WebSocketProvider } from '../context/WebSocketContext'

const ChatScreen = () => {
  return (
    <WebSocketProvider>
        <ChatPage />
    </WebSocketProvider>
  )
}

export default ChatScreen