import React from 'react';
import { Linking,StyleSheet } from 'react-native';
import { Card, List,Snackbar,Text} from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import LogoutButton from './LogOutButton';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; 

const AboutSection = () => {
    const [visible, setVisible] = React.useState(false);
    const { colors } = useTheme();
    const { t } = useTranslation(); 

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
     <GrandientText
            text={t('settingsScreen.aboutSection.title')}
            colors={colors.languageTextGradient}
            textStyle={{ fontSize: 22, color: colors.text }}
            gradientDirection="horizontal"
          />

        <List.Item
        titleStyle={[styles.titleStyle, { color: colors.text }]}
          title={t('settingsScreen.aboutSection.appVersion')} 
          onPress={onToggleSnackBar}
          descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
          description="1.0.0"
          left={props => <List.Icon {...props}  color={colors.primary} icon="information" />}
        />

        <List.Item
          title={t('settingsScreen.aboutSection.termsOfService')} 
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          left={props => <List.Icon {...props}  color={colors.primary} icon="file-document" />}
          right={props => <List.Icon {...props}  color={colors.primary} icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/terms')}
        />

        <List.Item
          title={t('settingsScreen.aboutSection.privacyPolicy')} 
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          left={props => <List.Icon {...props}  color={colors.primary} icon="shield" />}
          right={props => <List.Icon {...props}  color={colors.primary} icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/privacy')}
        />

        <LogoutButton />
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar} 

>

<Text style={{ color: 'white', fontFamily: 'Orbitron-ExtraBold' }}>
    {t('settingsScreen.aboutSection.appVersionSnackbar')}
  </Text>
 </Snackbar>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  titleStyle: {
    fontFamily: 'Orbitron-ExtraBold',
  },
  descriptionStyle: {
    fontFamily: 'Orbitron-VariableFont_wght',
  }
});

export default AboutSection;