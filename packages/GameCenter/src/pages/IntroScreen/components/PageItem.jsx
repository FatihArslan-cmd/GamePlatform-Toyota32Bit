import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { Divider, Text, TouchableRipple } from "react-native-paper";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const PageItem = ({ page, scaleAnim, translateAnim, navigation }) => (
  <View style={styles.container}>
    <View style={styles.backgroundImageContainer}>
      <FastImage
        source={page.icon ? { uri: page.icon } : page.image}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      {/* Replaced BlurView with a simple View for a dark overlay */}
      <View
        style={styles.backgroundOverlay}
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
        <TouchableRipple
          style={styles.startButton}
          onPress={() => navigation.navigate('Login')}
          rippleColor="rgba(255, 255, 255, 0.3)"
        >
          <View style={styles.startButtonContent}>
            <Text style={styles.startButtonText}>START YOUR JOURNEY</Text>
            <Icon
              name="chevron-double-right"
              size={TABLET_DEVICE ? 20 : 18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </View>
        </TouchableRipple>
      )}
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  // New style for the overlay, replacing the blur style
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Keeps the dark, semi-transparent overlay
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: TABLET_DEVICE ? 20 : 15,
    zIndex: 1,
  },
  image: {
    width: TABLET_DEVICE ? 250 : 180,
    height: TABLET_DEVICE ? 250 : 180,
    borderRadius: 20,
    marginBottom: TABLET_DEVICE ? 20 : 15,
    borderWidth: 2,
    shadowColor: '#8a2be2',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  dividerContainer: {
    width: '100%',
    marginVertical: TABLET_DEVICE ? 10 : 8,
    alignItems: 'center',
  },
  divider: {
    width: TABLET_DEVICE ? '40%' : '50%',
    height: 1,
    backgroundColor: '#8a2be2',
    borderRadius: 1,
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: TABLET_DEVICE ? 28 : 22,
    marginTop: TABLET_DEVICE ? 20 : 15,
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: '#8a2be2',
    textShadowRadius: 10,
    fontFamily: 'Orbitron-ExtraBold',
  },
  subtitle: {
    fontSize: TABLET_DEVICE ? 16 : 14,
    textAlign: 'center',
    color: '#fff',
    marginTop: TABLET_DEVICE ? 10 : 8,
    marginHorizontal: TABLET_DEVICE ? 20 : 15,
    lineHeight: TABLET_DEVICE ? 24 : 20,
    fontFamily: 'Orbitron-ExtraBold',
  },
  startButton: {
    marginTop: TABLET_DEVICE ? 30 : 25,
    paddingVertical: TABLET_DEVICE ? 15 : 12,
    paddingHorizontal: TABLET_DEVICE ? 30 : 25,
    backgroundColor: '#8a2be2',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: TABLET_DEVICE ? 16 : 14,
    letterSpacing: 1,
    fontFamily: 'Orbitron-ExtraBold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default PageItem;