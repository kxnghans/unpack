import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
} from 'react-native';
import { useTheme } from './ThemeProvider';
import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const COLLAPSED_HEIGHT = 60; // Enough space for the handle and chevron

export function BottomSheet({ children }) {
  const { colors } = useTheme();
  const animatedHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;
  const lastHeight = useRef(COLLAPSED_HEIGHT);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bouncing animation for the chevron
    if (isCollapsed) {
      const bounce = Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]);
      Animated.loop(bounce).start();
    } else {
      bounceValue.stopAnimation();
      bounceValue.setValue(0);
    }
  }, [isCollapsed, bounceValue]);

  animatedHeight.addListener(({ value }) => {
    lastHeight.current = value;
    setIsCollapsed(value === COLLAPSED_HEIGHT);
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedHeight.setOffset(lastHeight.current);
        animatedHeight.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        animatedHeight.setValue(-gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        animatedHeight.flattenOffset();
        const finalHeight = lastHeight.current - gestureState.dy;

        // If dragged down below a threshold, snap back to collapsed state
        if (finalHeight < COLLAPSED_HEIGHT * 2) {
          Animated.spring(animatedHeight, {
            toValue: COLLAPSED_HEIGHT,
            useNativeDriver: false,
          }).start();
        } else { 
          // Otherwise, stay where it is
          // To prevent it from exceeding screen height
          const clampedHeight = Math.min(finalHeight, SCREEN_HEIGHT - 100);
          Animated.spring(animatedHeight, {
            toValue: clampedHeight,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const panelStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, SCREEN_HEIGHT],
      outputRange: [0, SCREEN_HEIGHT],
      extrapolate: 'clamp',
    }),
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    handleContainer: {
      height: COLLAPSED_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
    },
    handle: {
      width: 40,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: colors.textSecondary + '50',
      position: 'absolute',
      top: 12,
    },
    chevronContainer: {
        position: 'absolute',
        top: 25,
    }
  });

  return (
    <Animated.View style={[styles.container, panelStyle]} {...panResponder.panHandlers}>
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
        {isCollapsed && (
            <Animated.View style={[styles.chevronContainer, { transform: [{ translateY: bounceValue }] }]}>
                <Feather name="chevron-up" size={24} color={colors.text} />
            </Animated.View>
        )}
      </View>
      {children}
    </Animated.View>
  );
}