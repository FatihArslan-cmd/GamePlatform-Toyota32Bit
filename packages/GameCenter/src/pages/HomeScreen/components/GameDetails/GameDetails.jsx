import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, Surface, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
import BackButton from '../../../../components/BackIcon';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function GameDetails() {
    const route = useRoute();
    const {
      title,
      instructions,
      imageSource,
      buttonText,
      onButtonPress,
    } = route.params;
  const translateY = useSharedValue(height - 275);
  const scale = useSharedValue(1);
  const contentTranslateY = useSharedValue(100);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Animations
    translateY.value = withTiming(-height / 2 + 250, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withSequence(
      withTiming(2.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      withTiming(2, { duration: 300, easing: Easing.bounce })
    );

    contentTranslateY.value = withDelay(800, 
      withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
    );

    contentOpacity.value = withDelay(800, 
      withTiming(1, { duration: 600, easing: Easing.bezier(0.4, 0, 0.2, 1) })
    );
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a148c', '#7c43bd', '#9b6bf5']}
        style={styles.gradient}
      >
        <BackButton style={styles.backButton} color="white" size={32} />
        <Animated.Image
          source={imageSource}
          style={[styles.image, animatedImageStyle]}
        />
        <Animated.View style={[styles.contentWrapper, animatedContentStyle]}>
          <Surface style={styles.infoContainer}>
            <Title style={styles.title}>{title}</Title>
            <View style={styles.instructionContainer}>
              {instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.instructionNumber}>{index + 1}</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
            <Button
              mode="contained"
              onPress={onButtonPress}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
            >
              {buttonText}
            </Button>
          </Surface>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 16,
      zIndex: 10,
    },
    image: {
      borderRadius: 55,
      width: width * 0.6,
      height: height * 0.2,
      resizeMode: 'contain',
    },
    contentWrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '60%',
    },
    infoContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 24,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      marginBottom: 24,
      textAlign: 'center',
      color: '#4a148c',
      letterSpacing: 0.5,
    },
    instructionContainer: {
      marginBottom: 32,
      backgroundColor: '#f8f6fe',
      padding: 16,
      borderRadius: 20,
    },
    instructionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      paddingHorizontal: 8,
      backgroundColor: '#ffffff',
      padding: 12,
      borderRadius: 12,
      elevation: 2,
    },
    instructionNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#4a148c',
      color: 'white',
      textAlign: 'center',
      lineHeight: 28,
      marginRight: 12,
      fontWeight: '600',
    },
    instructionText: {
      flex: 1,
      fontSize: 16,
      lineHeight: 24,
      color: '#1a1a1a',
    },
    buttonContainer: {
      paddingHorizontal: 16,
    },
    button: {
      borderRadius: 12,
      elevation: 4,
      backgroundColor: '#4a148c',
    },
    buttonContent: {
      height: 56,
    },
    buttonLabel: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
});
