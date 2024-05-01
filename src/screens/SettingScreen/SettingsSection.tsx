import React from "react";

import { Box, Text } from "@/atoms";

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const SettingsSection = (props: Props) => {
  const { title, children } = props;

  return (
    <Box borderColor="mainForeground" borderWidth={1} borderRadius="s" p="s">
      <Box
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Text fontWeight="bold">{title}</Text>
      </Box>
      <Box padding="m">{children}</Box>
    </Box>
  );
};
