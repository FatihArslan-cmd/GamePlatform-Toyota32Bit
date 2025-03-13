import React, { useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Card, List, RadioButton } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import GradientDivider from '../../../components/GradientDivider';
import { ToastService } from '../../../context/ToastService';
import { useTheme } from '../../../context/ThemeContext';

const LanguageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Turkish');
  const { colors } = useTheme();

  const handlePress = () => setExpanded(!expanded);

  const handleLanguageChange = (language) => {
    if (selectedLanguage === language) {
      ToastService.show('info', 'This language is already selected');
    } else {
      setSelectedLanguage(language);
      setExpanded(false);
      ToastService.show('success', `Language changed to ${language}`);
    }
  };

  const getFlagEmoji = (language) => {
    switch (language) {
      case 'Turkish':
        return '🇹🇷 ';
      case 'English':
        return '🇺🇸 ';
      case 'German':
        return '🇩🇪 ';
      default:
        return '';
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text="Language"
          colors={colors.languageTextGradient}
          textStyle={{ fontSize: 22, color: colors.text }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          style={{ backgroundColor: colors.card }}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          title="Choose Language"
          descriptionStyle={{ fontFamily: 'Orbitron-VariableFont_wght', color: colors.subText }}
          description={`${selectedLanguage} (${selectedLanguage === 'Turkish' ? 'TR' : selectedLanguage === 'English' ? 'EN' : 'DE'})`}
          left={props => <List.Icon {...props} color={colors.primary} icon="translate" />}
          right={props => <List.Icon {...props} color={colors.subText} icon={expanded ? "chevron-up" : "chevron-down"} />} 
        >
          <List.Item
            title={`${getFlagEmoji('Turkish')}Türkçe`}
            onPress={() => handleLanguageChange('Turkish')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            left={props => <List.Icon {...props} color={colors.primary} />}
            right={() => selectedLanguage === 'Turkish' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title={`${getFlagEmoji('English')}English`}
            onPress={() => handleLanguageChange('English')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            left={props => <List.Icon {...props} color={colors.primary} />}
            right={() => selectedLanguage === 'English' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title={`${getFlagEmoji('German')}Deutsch`}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
            onPress={() => handleLanguageChange('German')}
            left={props => <List.Icon {...props} color={colors.primary} />}
            right={() => selectedLanguage === 'German' ? <List.Icon icon="check" color={colors.primary} /> : null}
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