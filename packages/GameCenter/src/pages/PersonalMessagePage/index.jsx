import React from 'react'
import { LobbyInviteProvider } from './context/LobbyInviteContext'
import Page from './components/PersonalMessagePage'

const NotificationScreen = () => {
  return (
     <LobbyInviteProvider>
    <Page />
    </LobbyInviteProvider>
  )
}

export default NotificationScreen