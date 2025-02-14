import React from 'react';
import { Linking,StyleSheet } from 'react-native';
import { Card, List} from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import GradientDivider from '../../../components/GradientDivider';

const ThemeSection = ({ handleThemePress }) => { // Receive handleThemePress as prop


  return (


    <Card style={styles.card}>
      <Card.Content>

      <GrandientText
            text="Theme"
            colors={['#FF6B6B', '#FFD93D','red','blue','green','purple']}
            textStyle={{ fontSize: 22 }}
            gradientDirection="horizontal"
          />
  <GradientDivider height={1} horizontalMargin='%10'  colorProps={['black', '#778899']} />      <List.Item
        titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          title="Choose Theme"
          descriptionStyle={{fontFamily:'Orbitron-VariableFont_wght'}}
          description="System Default"
          left={props => <List.Icon {...props}  color="#6366F1" icon="theme-light-dark" />}
          onPress={handleThemePress} // Call handleThemePress from props
      />


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

export default ThemeSection;