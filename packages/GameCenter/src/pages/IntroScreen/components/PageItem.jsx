
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import { Divider,Text } from 'react-native-paper';

const PageItem = ({ page, scaleAnim, translateAnim, navigation }) => (
  <View style={styles.container}>
    <View style={styles.backgroundImageContainer}>
      <FastImage
        source={page.icon ? { uri: page.icon } : page.image}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={200}
        reducedTransparencyFallbackColor="black"
      />
    </View>

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
      <FastImage
        source={page.icon ? { uri: page.icon } : page.image}
        style={[styles.image, { borderColor: '#8a2be250' }]}
      />

      <Text style={styles.title}>{page.title}</Text>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
      </View>

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
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
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
  dividerContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  divider: {
    width: '40%',
    height: 1,
    backgroundColor: '#8a2be2',
    marginVertical: 10,
    borderRadius: 1,
    shadowColor: '#8a2be2',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
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
    fontFamily: 'Orbitron-ExtraBold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
    lineHeight: 24,
    fontFamily: 'Orbitron-ExtraBold',
  },
  startButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#8a2be2',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#8a2be2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: 'Orbitron-ExtraBold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default PageItem;
