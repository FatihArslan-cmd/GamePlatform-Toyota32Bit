import React from 'react'
import { LobbyInviteProvider } from './context/LobbyInviteContext'
import Page from './components/PersonalMessagePage'

const PersonalMessagePage = () => {
  return (
     <LobbyInviteProvider>
    <Page />
    </LobbyInviteProvider>
  )
}

export default PersonalMessagePage