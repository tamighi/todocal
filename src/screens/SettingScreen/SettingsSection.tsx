import React from "react";

import { Box, Text } from "@/atoms";
import { IconButton } from "@/components";

type Props = {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export const SettingsSection = (props: Props) => {
  const { title, children, defaultOpen = false } = props;

  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Box>
      <Box
        borderWidth={0.7}
        borderColor="mainForeground"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Text variant="subTitle">{title}</Text>
        <IconButton
          name={open ? "chevron-up" : "chevron-down"}
          onPress={() => setOpen(!open)}
        />
      </Box>
      <Box visible={open} padding="m">
        {children}
      </Box>
    </Box>
  );
};
