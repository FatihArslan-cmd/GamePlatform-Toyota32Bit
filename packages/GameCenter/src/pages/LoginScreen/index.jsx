import React, { useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { TextInput, Button, Text, Checkbox, Portal, Modal,TouchableRipple } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GameLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  
  const scaleAnim = new Animated.Value(1);

  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#1a1b2e', '#2d0a3e', '#1a1b2e']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Portal>
        <Modal
          visible={forgotPasswordVisible}
          onDismiss={() => setForgotPasswordVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Reset Password</Text>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.modalInput}
            theme={{ colors: { primary: '#8a2be2' } }}
          />
          <Button
            mode="contained"
            onPress={() => setForgotPasswordVisible(false)}
            style={styles.modalButton}
            labelStyle={styles.modalButtonText}
          >
            Send Reset Link
          </Button>
        </Modal>
      </Portal>

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Icon name="gamepad-variant" size={80} color="#8a2be2" />
          <Text style={styles.welcomeText}>GAME CENTER</Text>
          <Text style={styles.subtitleText}>Enter your realm</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Email / Username"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            left={<TextInput.Icon icon="account-circle" color="#8a2be2" />}
            theme={{ colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: '#fff' } }}
            outlineColor="#8a2be250"
            activeOutlineColor="#8a2be2"
            textColor="#fff"
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            left={<TextInput.Icon icon="shield-key" color="#8a2be2" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color="#8a2be2"
              />
            }
            theme={{ colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: '#fff' } }}
            outlineColor="#8a2be250"
            activeOutlineColor="#8a2be2"
            textColor="#fff"
          />

          <View style={styles.optionsContainer}>
            <Checkbox.Item
              label="Remember Me"
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              labelStyle={styles.checkboxLabel}
              color="#8a2be2"
            />
            
            <TouchableRipple
              onPress={() => setForgotPasswordVisible(true)}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableRipple>
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Button
              mode="contained"
              onPress={() => pulseAnimation()}
              style={styles.loginButton}
              labelStyle={styles.buttonLabel}
            >
              START GAME
            </Button>
          </Animated.View>

          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.signupButton}
            labelStyle={styles.signupButtonLabel}
          >
            CREATE NEW ACCOUNT
          </Button>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Quick Login with</Text>
            <View style={styles.socialButtons}>
              <TouchableRipple style={styles.socialButton}>
                <Icon name="steam" size={24} color="#fff" />
              </TouchableRipple>
              <TouchableRipple style={styles.socialButton}>
                <Icon name="microsoft-xbox" size={24} color="#fff" />
              </TouchableRipple>
              <TouchableRipple style={styles.socialButton}>
                <Icon name="sony-playstation" size={24} color="#fff" />
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Anton-Regular', // Büyük ve çarpıcı metin için
    marginTop: 10,
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: 16,
    color: '#8a2be2',
    fontFamily: 'Orbitron-VariableFont_wght', // Orta boyutlu metin için
    marginTop: 5,
    letterSpacing: 3,
  },
  formContainer: {
    backgroundColor: '#ffffff08',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be230',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff10',
    fontFamily: 'RussoOne-Regular', // Hafif ve okunabilir
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'RussoOne-Regular', // İnce ve küçük metinler için
  },
  forgotPassword: {
    marginRight: 10,
  },
  forgotPasswordText: {
    color: '#8a2be2',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'Orbitron-VariableFont_wght', // Orta boyutlu metin
  },
  loginButton: {
    marginBottom: 10,
    backgroundColor: '#8a2be2',
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Orbitron-VariableFont_wght', // Düğme metinleri için çarpıcı
    letterSpacing: 1,
  },
  signupButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
  },
  signupButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght', // Orta boyutlu metin
    letterSpacing: 1,
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  socialText: {
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'RussoOne-Regular', // Hafif ve okunabilir
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8a2be220',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#8a2be250',
  },
  modalContent: {
    backgroundColor: '#1a1b2e',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be2',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Anton-Regular', // Büyük ve dikkat çekici metin
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 20,
    backgroundColor: '#ffffff10',
    fontFamily: 'RussoOne-Regular', // Hafif ve okunabilir
  },
  modalButton: {
    backgroundColor: '#8a2be2',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Anton-Regular', // Çarpıcı düğme metinleri
  },
});


export default GameLoginScreen;