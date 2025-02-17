import React from 'react'
import { FriendInviteProvider } from './context/FriendInviteContext';
import FriendInvitePage from './components/FriendInvitePage';
const index = () => {
  return (
    <FriendInviteProvider>
        <FriendInvitePage />
    </FriendInviteProvider>
  )
}

export default index