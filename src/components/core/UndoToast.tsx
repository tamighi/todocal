import React from "react";

import { Box, Button, Text } from "@/atoms";
import { Feather } from "@expo/vector-icons";
import { Animated } from "react-native";

export interface UndoToastProps {
  message?: string;
  callback?: () => void;
  show: boolean;
  duration?: number;
  close: () => void;
}

export const UndoToast = (props: UndoToastProps) => {
  const { message = "", duration = 5000, show, callback, close } = props;
  const [hideTimer, setHideTimer] = React.useState<NodeJS.Timeout>();

  const translateY = React.useRef(new Animated.Value(50)).current;

  const showAnimation = Animated.timing(translateY, {
    toValue: -50,
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
        hideAnimation.start(close);
      }, duration);

      setHideTimer(timer);
    });
  };

  React.useEffect(() => {
    if (show) {
      showToast();
    }
  }, [show, translateY]);

  const onUndoClick = () => {
    callback?.();
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
          bg="emphasize"
        >
          <Button onPress={onUndoClick}>
            <Box flexDirection="row" alignItems="center" gap="s">
              <Text marginRight="lg">{message}</Text>
              <Feather
                style={{ transform: [{ translateY: 1 }] }}
                name="rotate-cw"
              />
              <Text>undo</Text>
            </Box>
          </Button>
        </Box>
      </Animated.View>
    </Box>
  );
};
