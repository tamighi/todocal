import React from "react";

import { Box, Text } from "@/atoms";

import { Feather } from "@expo/vector-icons";
import { Animated, Pressable } from "react-native";
import { useTheme } from "@/hooks";

export interface UndoToastProps {
  message?: string;
  undoCallback?: () => void;
  show: boolean;
  duration?: number;
  close: () => void;
}

export const UndoToast = (props: UndoToastProps) => {
  const { message = "", duration = 5000, show, undoCallback, close } = props;
  const [hideTimer, setHideTimer] = React.useState<NodeJS.Timeout>();

  const theme = useTheme();

  const translateY = React.useRef(new Animated.Value(50)).current;

  const showAnimation = Animated.timing(translateY, {
    toValue: -65,
    duration: 500,
    useNativeDriver: true,
  });

  const hideAnimation = Animated.timing(translateY, {
    toValue: 50,
    duration: 500,
    useNativeDriver: true,
  });

  const showToast = () => {
    showAnimation.start(() => {
      const timer = setTimeout(() => {
        hideAnimation.start();
      }, duration);

      setHideTimer(timer);
    });
  };

  React.useEffect(() => {
    if (show) {
      showAnimation.reset();
      clearTimeout(hideTimer);
      showToast();
      close();
    }
  }, [show, translateY]);

  const onUndoClick = () => {
    undoCallback?.();
    close();

    showAnimation.stop();
    clearTimeout(hideTimer);
    hideAnimation.start();
  };

  return (
    <Box
      zIndex={10000}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      alignItems="center"
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Box
          alignItems="center"
          paddingVertical="xxs"
          paddingHorizontal="s"
          borderRadius="s"
          flexDirection="row"
          bg="secondaryBackground"
          borderColor="mainForeground"
          borderWidth={1}
          elevation={8}
          shadowColor="black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={4.65}
        >
          <Pressable onPress={onUndoClick}>
            <Box flexDirection="row" alignItems="center" gap="s">
              <Text marginRight="l">{message}</Text>
              <Feather
                style={{ transform: [{ translateY: 1 }] }}
                color={theme.colors.mainForeground}
                name="rotate-cw"
              />
              <Text>undo</Text>
            </Box>
          </Pressable>
        </Box>
      </Animated.View>
    </Box>
  );
};
