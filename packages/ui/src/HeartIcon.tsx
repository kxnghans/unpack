import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outset: {
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
    inset: {
      shadowColor: '#000',
      shadowOffset: {
        width: -2,
        height: -2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.container, isLiked ? styles.outset : styles.inset, animatedStyle]}>
        <FontAwesome
          name={isLiked ? 'heart' : 'heart-o'}
          size={16}
          color={isLiked ? 'red' : 'white'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
