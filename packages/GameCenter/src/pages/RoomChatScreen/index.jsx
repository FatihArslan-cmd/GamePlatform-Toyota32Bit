import React from 'react'
import { WebSocketProvider } from './context/WebSocketContext'
import Page from './components/RoomChatScreen'
import { useRoute } from '@react-navigation/native'

const RoomChatScreen = () => {
    const route = useRoute();
    const { roomId } = route.params || {};

  return (
    <WebSocketProvider roomId={roomId}>
      <Page />
    </WebSocketProvider>
  )
}

export default RoomChatScreen