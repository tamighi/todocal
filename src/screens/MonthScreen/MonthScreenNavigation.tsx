import { Box, Text } from "@/atoms";

type Props = {
  monthId: string;
};

export const MonthScreenNavigation: React.FC<Props> = (props) => {
  const { monthId } = props;

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="center">
      <Text>{monthId}</Text>
    </Box>
  );
};
