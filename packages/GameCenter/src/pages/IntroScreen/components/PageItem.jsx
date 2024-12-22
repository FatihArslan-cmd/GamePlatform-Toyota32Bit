import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const PageItem = ({ page, scaleAnim, translateAnim ,navigation}) => (
  <LinearGradient
    colors={['#1a1b2e', '#2d0a3e', '#1a1b2e']}
    locations={[0, 0.5, 1]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
  >
    <Animated.View
      style={[
        styles.page,
        {
          transform: [
            { scale: scaleAnim },
            { translateX: translateAnim },
          ],
        },
      ]}
    >
      <Image
        source={
          page.icon
            ? { uri: page.icon }
            : page.image
        }
        style={[styles.image, { borderColor: '#8a2be250' }]}
      />
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.subtitle}>{page.subtitle}</Text>
   
      {page.button && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.startButtonContent}>
            <Text style={styles.startButtonText}>START YOUR JOURNEY</Text>
            <Icon name="chevron-double-right" size={20} color="#fff" style={styles.buttonIcon} />
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  page: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#8a2be2',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: '#8a2be2',
    textShadowRadius: 10,
    fontFamily:'RussoOne-Regular'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8a2be2',
    marginTop: 10,
    marginHorizontal: 20,
    lineHeight: 24,
    fontFamily:'RussoOne-Regular'

  },
  startButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#8a2be2',
    borderRadius: 30,
    elevation: 5,
  },
  startButtonContent: { flexDirection: 'row', alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 16, letterSpacing: 1,    fontFamily:'RussoOne-Regular'
  },
  buttonIcon: { marginLeft: 8 },
});

export default PageItem;
