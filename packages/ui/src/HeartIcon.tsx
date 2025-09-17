/**
 * This file defines the HeartIcon component, a like button with a spring animation.
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

/**
 * A heart icon that can be liked and unliked with a spring animation.
 * @param {object} props - The component props.
 * @param {boolean} props.isLiked - Whether the icon is liked.
 * @param {() => void} props.onPress - A function to call when the icon is pressed.
 */
export const HeartIcon = ({ isLiked, onPress }) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  // An animated style to scale the icon when it is pressed.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  /**
   * Handles a press on the icon, triggering the spring animation.
   */
  const handlePress = () => {
    // Apply a spring animation to the icon's scale.
    scale.value = withSpring(isLiked ? 1 : 1.2, {}, () => {
      // After the initial spring, spring back to the original scale.
      scale.value = withSpring(1);
    });
    onPress();
  };

  const styles = StyleSheet.create({
    container: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lightShadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 16,
      },
      darkShadow: {
        shadowColor: colors.highlight,
        shadowOffset: {
          width: -2,
          height: -2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 16,
      },
    heart: {
      textShadowColor: colors.highlight,
      textShadowOffset: { width: -1, height: -1 },
      textShadowRadius: 1,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress}>
        <Animated.View style={animatedStyle}>
            {/* The neumorphic shadow is created by two nested views with different shadows. */}
            <View style={styles.darkShadow}>
                <View style={styles.lightShadow}>
                    <View style={styles.container}>
                        <FontAwesome
                        name={isLiked ? 'heart' : 'heart-o'}
                        size={16}
                        color={isLiked ? 'red' : colors.text}
                        style={isLiked && styles.heart}
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    </TouchableOpacity>
  );
};
