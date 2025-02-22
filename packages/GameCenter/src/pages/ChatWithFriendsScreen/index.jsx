import React from 'react'
import Page from './pages/Page'
import { FriendsProvider } from './context/FriendsContext'

const ChatWithFriendsScreen = () => {
  return (
    <FriendsProvider>
        <Page />
    </FriendsProvider>
  )
}

export default ChatWithFriendsScreen