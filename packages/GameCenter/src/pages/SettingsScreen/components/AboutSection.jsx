
import React from 'react';
import { Linking,StyleSheet } from 'react-native';
import { Card, List} from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import LogoutButton from './LogOutButton';

const AboutSection = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
     <GrandientText
            text="About"
            colors={['black', '#778899']}
            textStyle={{ fontSize: 22 }}
            gradientDirection="horizontal"
          />
        <List.Item
        titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          title="App Version"
          descriptionStyle={{fontFamily:'Orbitron-VariableFont_wght'}}
          description="1.0.0"
          left={props => <List.Icon {...props}  color="#6366F1" icon="information" />}
        />

        <List.Item
          title="Terms of Service"
          titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          left={props => <List.Icon {...props}  color="#6366F1" icon="file-document" />}
          right={props => <List.Icon {...props}  color="#6366F1" icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/terms')}
        />

        <List.Item
          title="Privacy Policy"
          titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          left={props => <List.Icon {...props}  color="#6366F1" icon="shield" />}
          right={props => <List.Icon {...props}  color="#6366F1" icon="chevron-right" />}
          onPress={() => Linking.openURL('https://your-app.com/privacy')}
        />

        <LogoutButton /> 

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
  }
});

export default AboutSection;