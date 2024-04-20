import React from "react";

import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

type Props = {
  children: React.ReactElement[];
};

export const Swipeable: React.FC<Props> = (props) => {
  const { children } = props;

  const horizontal = useSharedValue(0);

  const pan = Gesture.Pan().onChange((e) => {
    horizontal.value += e.changeX;
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={{
          flex: 1,
          position: "relative",
          transform: [{ translateX: horizontal }],
        }}
      >
        {children.map((child, index) => {
          return (
            <View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: `${index * 100}%`,
              }}
              key={child.key}
            >
              {child}
            </View>
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
};
