import React, { useRef, useMemo, useEffect, useState } from 'react';
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

export function BottomSheet({
  children,
  snapPoints: providedSnapPoints,
  snapToIndex = 0,
  onSnap,
}) {
  const { colors } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(snapToIndex === 0);

  const snapPoints = useMemo(
    () => providedSnapPoints || [60, SCREEN_HEIGHT * 0.4, SCREEN_HEIGHT * 0.8],
    [providedSnapPoints]
  );

  const animatedHeight = useRef(new Animated.Value(snapPoints[snapToIndex]))
    .current;
  const lastHeight = useRef(snapPoints[snapToIndex]);
  const currentIndex = useRef(snapToIndex);
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    lastHeight.current = snapPoints[snapToIndex];
    currentIndex.current = snapToIndex;
    Animated.spring(animatedHeight, {
      toValue: snapPoints[snapToIndex],
      friction: 9,
      tension: 80,
      useNativeDriver: false,
    }).start(() => {
      lastHeight.current = snapPoints[snapToIndex];
      const isCurrentlyCollapsed = snapToIndex === 0;
      setIsCollapsed(isCurrentlyCollapsed);
      if (isCurrentlyCollapsed) {
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
    });
  }, [snapToIndex, snapPoints, animatedHeight, bounceValue]);

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
        
        const nextSnapPointIndex = snapPoints.reduce((closestIndex, point, i) => {
          const distance = Math.abs(finalHeight - point);
          const closestDistance = Math.abs(
            finalHeight - snapPoints[closestIndex]
          );
          return distance < closestDistance ? i : closestIndex;
        }, 0);

        currentIndex.current = nextSnapPointIndex;
        if (onSnap) {
          onSnap(nextSnapPointIndex);
        }

        lastHeight.current = snapPoints[nextSnapPointIndex];

        Animated.spring(animatedHeight, {
          toValue: snapPoints[nextSnapPointIndex],
          friction: 9,
          tension: 80,
          useNativeDriver: false,
        }).start(() => {
          const isCurrentlyCollapsed = nextSnapPointIndex === 0;
          setIsCollapsed(isCurrentlyCollapsed);
          if (isCurrentlyCollapsed) {
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
        });
      },
    })
  ).current;

  const panelStyle = {
    height: animatedHeight.interpolate({
      inputRange: [snapPoints[0], snapPoints[snapPoints.length - 1]],
      outputRange: [snapPoints[0], snapPoints[snapPoints.length - 1]],
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
      height: 60,
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
    },
  });

  return (
    <Animated.View
      style={[styles.container, panelStyle]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
        {isCollapsed && (
          <Animated.View
            style={[
              styles.chevronContainer,
              { transform: [{ translateY: bounceValue }] },
            ]}
          >
            <Feather name="chevron-up" size={24} color={colors.text} />
          </Animated.View>
        )}
      </View>
      {children}
    </Animated.View>
  );
}
