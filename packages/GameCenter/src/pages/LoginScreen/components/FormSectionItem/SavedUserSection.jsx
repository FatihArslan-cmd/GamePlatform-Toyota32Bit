import { View, Text } from 'react-native'
import React from 'react'
import { getRefreshToken } from '../../../../shared/states/api';

const SavedUserSection = () => {
    const refreshToken = getRefreshToken(); // Refresh token'i al

  return (
    <View>
      <Text>SavedUserSection</Text>
    </View>
  )
}

export default SavedUserSection