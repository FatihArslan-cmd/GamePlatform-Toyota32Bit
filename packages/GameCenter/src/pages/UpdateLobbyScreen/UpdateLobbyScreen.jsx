import React from 'react'
import { LobbyUpdateProvider } from './context/LobbyUpdateContext'
import Page from './components/Page'
import BackButton from '../../components/BackIcon'

const UpdateLobbyScreen = () => {
  return (
    <LobbyUpdateProvider>
        <BackButton />
        <Page />
    </LobbyUpdateProvider>
  )
}

export default UpdateLobbyScreen