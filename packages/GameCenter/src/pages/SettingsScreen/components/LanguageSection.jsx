import GrandientText from "../../../components/GrandientText";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card, List } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { storage } from "../../../utils/storage";

const TABLET_DEVICE = isTablet();

const LanguageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const [setSelectedLanguage] = useState(i18n.language);
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
          textStyle={{ fontSize: TABLET_DEVICE ? 22 : 18 , color: colors.text }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          style={{ backgroundColor: colors.card }}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text ,fontSize: TABLET_DEVICE ? 19 : 14 }}
          title={t('settingsScreen.langSection.chooseLang')}
          descriptionStyle={{ fontFamily: 'Orbitron-VariableFont_wght', color: colors.subText,fontSize: TABLET_DEVICE ? 18 : 12 }}
          description={`${i18n.language} (${getLanguageCodeDisplay(i18n.language)})`} 
          left={props => <List.Icon {...props} color={colors.primary} icon="translate" />}
          right={props => <List.Icon {...props} color={colors.subText} icon={expanded ? "chevron-up" : "chevron-down"} />}
        >
        <List.Item
          title={`${getFlagEmoji('tr')} ${t('loginScreen.turkish')}`}
          onPress={() => changeLanguage('tr')}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text ,fontSize: TABLET_DEVICE ? 18 : 12}}
          left={props => <List.Icon {...props} color={colors.primary} />}
          right={() => i18n.language === 'tr' ? <List.Icon icon="check" color={colors.primary} /> : null}
        />

        <List.Item
          title={`${getFlagEmoji('en')} ${t('loginScreen.english')}`}
          onPress={() => changeLanguage('en')}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text ,fontSize: TABLET_DEVICE ? 18 : 12}}
          left={props => <List.Icon {...props} color={colors.primary} />}
          right={() => i18n.language === 'en' ? <List.Icon icon="check" color={colors.primary} /> : null}
        />

        <List.Item
          title={`${getFlagEmoji('de')} ${t('loginScreen.german')}`}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text,fontSize: TABLET_DEVICE ? 18 : 12 }}
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