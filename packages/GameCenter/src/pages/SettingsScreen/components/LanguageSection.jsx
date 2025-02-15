import React, { useState } from 'react';
import { Linking,StyleSheet } from 'react-native';
import { Card, List, RadioButton } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import GradientDivider from '../../../components/GradientDivider';
import { ToastService } from '../../../context/ToastService'; // Import ToastService

const LanguageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Turkish'); // Default language

  const handlePress = () => setExpanded(!expanded);

  const handleLanguageChange = (language) => {
    if (selectedLanguage === language) {
      ToastService.show('info', 'This language is already selected'); // Show toast message if language is already selected
    } else {
      setSelectedLanguage(language);
      setExpanded(false); // Close the accordion after language selection
      ToastService.show('success', `Language changed to ${language}`); // Show toast message for language change
    }
  };

  const getFlagEmoji = (language) => {
    switch (language) {
      case 'Turkish':
        return '🇹🇷 ';
      case 'English':
        return '🇺🇸 '; // Or '🇬🇧 ' for British English, or just '🌐 ' for general language
      case 'German':
        return '🇩🇪 ';
      default:
        return '';
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <GrandientText
          text="Language"
          colors={['black', '#778899']}
          textStyle={{ fontSize: 22 }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
          title="Choose Language"
          descriptionStyle={{fontFamily:'Orbitron-VariableFont_wght'}}
          description={`${selectedLanguage} (${selectedLanguage === 'Turkish' ? 'TR' : selectedLanguage === 'English' ? 'EN' : 'DE'})`}
          left={props => <List.Icon {...props}  color="#6366F1" icon="translate" />}
        >
          <List.Item
            title={`${getFlagEmoji('Turkish')}Türkçe`}
            onPress={() => handleLanguageChange('Turkish')}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            right={() => selectedLanguage === 'Turkish' ? <List.Icon icon="check" /> : null}
          />
          <List.Item
            title={`${getFlagEmoji('English')}English`}
            onPress={() => handleLanguageChange('English')}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            right={() => selectedLanguage === 'English' ? <List.Icon icon="check" /> : null}
          />
          <List.Item
            title={`${getFlagEmoji('German')}Deutsch`}
            titleStyle={{fontFamily:'Orbitron-ExtraBold'}}
            onPress={() => handleLanguageChange('German')}
            right={() => selectedLanguage === 'German' ? <List.Icon icon="check" /> : null}
          />
        </List.Accordion>

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

export default LanguageSection;