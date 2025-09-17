/**
 * This file defines a customizable BottomSheet component for React Native.
 * It can be snapped to different heights and supports touch gestures.
 */
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

/**
 * A bottom sheet component that can be snapped to different points.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the bottom sheet.
 * @param {number[]} [props.snapPoints] - The points to snap the bottom sheet to.
 * @param {number} [props.snapToIndex=0] - The initial snap point index.
 * @param {(index: number) => void} [props.onSnap] - A callback for when the sheet snaps to a new point.
 */
export function BottomSheet({
  children,
  snapPoints: providedSnapPoints,
  snapToIndex = 0,
  onSnap,
}) {
  const { colors } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(snapToIndex === 0);

  // Memoize snap points to avoid re-calculating on every render.
  const snapPoints = useMemo(
    () => providedSnapPoints || [60, SCREEN_HEIGHT * 0.4, SCREEN_HEIGHT * 0.8],
    [providedSnapPoints]
  );

  const animatedHeight = useRef(new Animated.Value(snapPoints[snapToIndex]))
    .current;
  const lastHeight = useRef(snapPoints[snapToIndex]);
  const currentIndex = useRef(snapToIndex);
  const bounceValue = useRef(new Animated.Value(0)).current;

  // Animate to the initial snap point on mount or when snapToIndex changes.
  useEffect(() => {
    lastHeight.current = snapPoints[snapToIndex];
    currentIndex.current = snapToIndex;
    // Spring animation for a natural feel.
    Animated.spring(animatedHeight, {
      toValue: snapPoints[snapToIndex],
      friction: 9,
      tension: 80,
      useNativeDriver: false,
    }).start(() => {
      lastHeight.current = snapPoints[snapToIndex];
      const isCurrentlyCollapsed = snapToIndex === 0;
      setIsCollapsed(isCurrentlyCollapsed);
      // If collapsed, start a bouncing animation on the chevron to indicate it can be expanded.
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
        // Stop the bouncing animation if not collapsed.
        bounceValue.stopAnimation();
        bounceValue.setValue(0);
      }
    });
  }, [snapToIndex, snapPoints, animatedHeight, bounceValue]);

  // Pan responder to handle touch gestures for dragging the bottom sheet.
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Set the offset to the last height, so the drag starts from the correct position.
        animatedHeight.setOffset(lastHeight.current);
        animatedHeight.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        // Update the height of the bottom sheet as the user drags.
        animatedHeight.setValue(-gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        // Clean up the offset after the drag gesture is released.
        animatedHeight.flattenOffset();
        const finalHeight = lastHeight.current - gestureState.dy;
        
        // Find the closest snap point to the final height of the sheet.
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

        // Animate the sheet to the closest snap point.
        Animated.spring(animatedHeight, {
          toValue: snapPoints[nextSnapPointIndex],
          friction: 9,
          tension: 80,
          useNativeDriver: false,
        }).start(() => {
          const isCurrentlyCollapsed = nextSnapPointIndex === 0;
          setIsCollapsed(isCurrentlyCollapsed);
          // Restart the bounce animation if it's collapsed again.
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

  // Interpolate the height to ensure it stays within the bounds of the snap points.
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
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: colors.shadow,
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
      backgroundColor: colors.primary,
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
      {/* The handle area for dragging the sheet */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
        {/* A bouncing chevron is shown when the sheet is collapsed to prompt the user to expand it. */}
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
      {/* The content of the bottom sheet */}
      {children}
    </Animated.View>
  );
}
