import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export const HeartIcon = ({ isLiked, onPress }) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(isLiked ? 1 : 1.2, {}, () => {
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
