import React from "react";

import { Box } from "@/atoms";
import { Button } from "@/components";

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
      <Button
        label={title}
        textVariant="subTitle"
        iconName={open ? "chevron-up" : "chevron-down"}
        padding="s"
        justifyContent="space-between"
        flexDirection="row"
        onPress={() => setOpen(!open)}
      />

      <Box visible={open} padding="m">
        {children}
      </Box>
    </Box>
  );
};
