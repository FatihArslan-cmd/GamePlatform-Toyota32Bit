import GrandientText from "../../../components/GrandientText";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Card, List } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { ToastService } from "../../../context/ToastService";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const ThemeSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme, colors } = useTheme();
  const { t } = useTranslation(); 


  const handlePress = () => setExpanded(!expanded);

  const handleThemeChange = (newTheme) => {
    if (theme === newTheme) {
      ToastService.show('info', t('settingsScreen.themeSection.alreadySelected')); 
    } else {
      setTheme(newTheme);
      setExpanded(false);
      ToastService.show('success', t('settingsScreen.themeSection.themeChanged') + t(`settingsScreen.themeSection.${newTheme}Mode`).toLowerCase()); 
    }
  };

  const getThemeIcon = (theme) => {
    switch (theme) {
      case 'system':
        return 'theme-light-dark';
      case 'light':
        return 'white-balance-sunny';
      case 'dark':
        return 'moon-waning-crescent';
      default:
        return 'theme-light-dark';
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <Card.Content>
        <GrandientText
          text={t('settingsScreen.themeSection.title')} 
          colors={colors.themeTextGradient}
          textStyle={{ fontSize: TABLET_DEVICE ? 22 : 18, color: colors.text }}
          gradientDirection="horizontal"
        />
        <List.Accordion
          style={{ backgroundColor: colors.card }}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text, fontSize: TABLET_DEVICE ? 18 : 12 }}
          title={t('settingsScreen.themeSection.chooseTheme')} 
          descriptionStyle={{ fontFamily: 'Orbitron-VariableFont_wght', color: colors.subText }}
          description={t(`settingsScreen.themeSection.${theme}ModeDescription`)} 
          left={props => <List.Icon {...props} color={colors.primary} icon="palette" />}
          right={props => <List.Icon {...props} color={colors.subText} icon={expanded ? "chevron-up" : "chevron-down"} />}
        >
          <List.Item
            title={t('settingsScreen.themeSection.systemDefault')} 
            onPress={() => handleThemeChange('system')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text, fontSize: TABLET_DEVICE ? 18 : 12 }}
            left={props => <List.Icon {...props} icon={getThemeIcon('system')} color={colors.primary} />}
            right={() => theme === 'system' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title={t('settingsScreen.themeSection.lightMode')} 
            onPress={() => handleThemeChange('light')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text, fontSize: TABLET_DEVICE ? 18 : 12 }}
            left={props => <List.Icon {...props} icon={getThemeIcon('light')} color={colors.primary} />}
            right={() => theme === 'light' ? <List.Icon icon="check" color={colors.primary} /> : null}
          />
          <List.Item
            title={t('settingsScreen.themeSection.darkMode')} 
            onPress={() => handleThemeChange('dark')}
            titleStyle={{ fontFamily: 'Orbitron-ExtraBold', color: colors.text , fontSize: TABLET_DEVICE ? 18 : 12}}
            left={props => <List.Icon {...props} icon={getThemeIcon('dark')} color={colors.primary} />}
            right={() => theme === 'dark' ? <List.Icon icon="check" color={colors.primary} /> : null}
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

export default ThemeSection;