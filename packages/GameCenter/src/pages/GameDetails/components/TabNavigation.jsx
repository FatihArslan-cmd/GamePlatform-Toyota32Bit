import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useGameDetails } from '../context/GameDetailsContext';
import { styles } from '../styles';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function TabNavigation({explanation}) {
  const { activeTab, setActiveTab } = useGameDetails();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const shouldRenderTabs = !!explanation;
  const startButtonStyle = explanation ? styles.tabButton : { ...styles.tabButton, flex: 0, width: '50%', marginHorizontal: '25%' };


  return (
    <View style={[styles.tabContainer,{ backgroundColor: colors.background }]}>
      <Button
        mode={activeTab === 'about' ? 'contained' : 'text'}
        onPress={() => setActiveTab('about')}
        style={startButtonStyle}
        labelStyle={{
          fontFamily: 'Orbitron-ExtraBold',
          color: activeTab === 'about' ? 'white' : colors.text
        }}
        icon="information"
        theme={{ colors: { primary: colors.gameDetailsButton, text: colors.text, onSurface: colors.text } }}
      >
        {t('gameDetailsScreen.start')}
      </Button>
      {shouldRenderTabs && (
        <>
          <Button
            mode={activeTab === 'lobbies' ? 'contained' : 'text'}
            onPress={() => setActiveTab('lobbies')}
            style={styles.tabButton}
            labelStyle={{
              fontFamily: 'Orbitron-ExtraBold',
              color: activeTab === 'lobbies' ? 'white' : colors.text
            }}
            icon="account-group"
            theme={{ colors: { primary: colors.gameDetailsButton, text: colors.text, onSurface: colors.text } }}
          >
           {t('gameDetailsScreen.lobbies')}
          </Button>
          <Button
            mode={activeTab === 'history' ? 'contained' : 'text'}
            onPress={() => setActiveTab('history')}
            style={styles.tabButton}
            labelStyle={{
              fontFamily: 'Orbitron-ExtraBold',
              color: activeTab === 'history' ? 'white' : colors.text
            }}
            icon="history"
            theme={{ colors: { primary: colors.gameDetailsButton, text: colors.text, onSurface: colors.text } }}
          >
            {t('gameDetailsScreen.history')}
          </Button>
          <Button
            mode={activeTab === 'settings' ? 'contained' : 'text'}
            onPress={() => setActiveTab('settings')}
            style={styles.tabButton}
            labelStyle={{
              fontFamily: 'Orbitron-ExtraBold',
              color: activeTab === 'settings' ? 'white' : colors.text
            }}
            icon="cog"
            theme={{ colors: { primary: colors.gameDetailsButton, text: colors.text, onSurface: colors.text } }}
          >
            {t('gameDetailsScreen.settings')}
          </Button>
        </>
      )}
    </View>
  );
}