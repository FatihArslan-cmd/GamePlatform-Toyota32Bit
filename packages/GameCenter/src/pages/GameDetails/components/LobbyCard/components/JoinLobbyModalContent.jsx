import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../../../../LoginScreen/components/FormSection/components/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

const JoinLobbyModalContent = ({ hasPassword, password, setPassword }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { t } = useTranslation();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {hasPassword && (
        <View style={styles.inputContainer}>
          <InputField
            label={t('gameDetailsScreen.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} 
            textColor="#ffffff"
            style={styles.passwordInput}
            rightIcon={() => (
              <Icon
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#8a2be2" 
                onPress={togglePasswordVisibility}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  passwordInput: {
    backgroundColor: '#444444',
    borderRadius: 8,
    marginTop: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default JoinLobbyModalContent;