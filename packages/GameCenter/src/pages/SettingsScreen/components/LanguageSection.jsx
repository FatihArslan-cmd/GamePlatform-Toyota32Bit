import React, { useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Card, List, RadioButton } from 'react-native-paper';
import GrandientText from '../../../components/GrandientText';
import GradientDivider from '../../../components/GradientDivider';
import { ToastService } from '../../../context/ToastService';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import * as storage from '../../../utils/storage'; 

const LanguageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { colors } = useTheme();
  const handlePress = () => setExpanded(!expanded);


  const changeLanguage = (value) => {
    i18n.changeLanguage(value)
      .then(() => {
        storage.set('language', value); 
        setSelectedLanguage(value);
      })
      .catch(err => console.log(err));
  };

  const getFlagEmoji = (language) => {
    switch (language) {
      case 'tr':
        return '🇹🇷 ';
      case 'en':
        return '🇺🇸 ';
      case 'de':
        return '🇩🇪 ';
      default:
        return '';
    }
  };

  const getLanguageCodeDisplay = (langCode) => {
    switch (langCode) {
      case 'tr':
        return 'TR';
      case 'en':
        return 'EN';
      case 'de':
        return 'DE';
      default:
        return '';
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text={t('settingsScreen.langSection.language')} 
          colors={colors.languageTextGradient}
          textStyle={{ fontSize: 22, color: colors.text }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          style={{ backgroundColor: colors.card }}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          title={t('settingsScreen.langSection.chooseLang')}
          descriptionStyle={{ fontFamily: 'Orbitron-VariableFont_wght', color: colors.subText }}
          description={`${i18n.language} (${getLanguageCodeDisplay(i18n.language)})`} 
          left={props => <List.Icon {...props} color={colors.primary} icon="translate" />}
          right={props => <List.Icon {...props} color={colors.subText} icon={expanded ? "chevron-up" : "chevron-down"} />}
        >
        <List.Item
          title={`${getFlagEmoji('tr')} ${t('loginScreen.turkish')}`}
          onPress={() => changeLanguage('tr')}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          left={props => <List.Icon {...props} color={colors.primary} />}
          right={() => i18n.language === 'tr' ? <List.Icon icon="check" color={colors.primary} /> : null}
        />

        <List.Item
          title={`${getFlagEmoji('en')} ${t('loginScreen.english')}`}
          onPress={() => changeLanguage('en')}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          left={props => <List.Icon {...props} color={colors.primary} />}
          right={() => i18n.language === 'en' ? <List.Icon icon="check" color={colors.primary} /> : null}
        />

        <List.Item
          title={`${getFlagEmoji('de')} ${t('loginScreen.german')}`}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text }}
          onPress={() => changeLanguage('de')}
          left={props => <List.Icon {...props} color={colors.primary} />}
          right={() => i18n.language === 'de' ? <List.Icon icon="check" color={colors.primary} /> : null}
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