import React from 'react';
import { Linking,StyleSheet } from 'react-native';
import { Card, List,Snackbar} from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import LogoutButton from './LogOutButton';
import { useTheme } from '../../../context/ThemeContext';

const AboutSection = () => {
    const [visible, setVisible] = React.useState(false);
    const { colors } = useTheme();

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
     <GrandientText
            text="About"
            colors={colors.languageTextGradient}
            textStyle={{ fontSize: 22, color: colors.text }}
            gradientDirection="horizontal"
          />

        <List.Item
        titleStyle={[styles.titleStyle, { color: colors.text }]}
          title="App Version"
          onPress={onToggleSnackBar}
          descriptionStyle={[styles.descriptionStyle, { color: colors.subText }]}
          description="1.0.0"
          left={props => <List.Icon {...props}  color={colors.primary} icon="information" />}
        />

        <List.Item
          title="Terms of Service"
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          left={props => <List.Icon {...props}  color={colors.primary} icon="file-document" />}
          right={props => <List.Icon {...props}  color={colors.primary} icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/terms')}
        />

        <List.Item
          title="Privacy Policy"
          titleStyle={[styles.titleStyle, { color: colors.text }]}
          left={props => <List.Icon {...props}  color={colors.primary} icon="shield" />}
          right={props => <List.Icon {...props}  color={colors.primary} icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/privacy')}
        />

        <LogoutButton />
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar} >

    App Version 1.0.0
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