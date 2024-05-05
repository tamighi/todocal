import { Box } from "@/atoms";
import React from "react";
import { Dimensions, FlatList, FlatListProps } from "react-native";

interface Props extends Partial<Omit<FlatListProps<number>, "renderItem">> {
  renderItem: (index: number) => React.ReactElement | null;
  itemWidth?: number;
  itemOffset?: number;
}

const WIDTH = Dimensions.get("window").width;

export const InfiniteFlatList = ({
  renderItem,
  itemWidth = WIDTH,
  itemOffset = 0,
  ...rest
}: Props) => {
  const [indexes, setIndexes] = React.useState<number[]>(
    Array.from({ length: 55 }, (_, i) => i - 50),
  );

  const handleEndReached = () => {
    const lastIndex = indexes.at(-1) as number;

    const newData = Array.from({ length: 5 }, (_, i) => lastIndex + i + 1);
    setIndexes([...indexes, ...newData]);
  };

  const handleStartReached = () => {
    const firstIndex = indexes.at(0) as number;

    const newIndexes = Array.from(
      { length: 5 },
      (_, i) => firstIndex - (i + 1),
    );

    setIndexes([...newIndexes.reverse(), ...indexes]);
  };

  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: itemWidth,
      offset: itemWidth * index - itemOffset,
      index,
    }),
    [],
  );

  return (
    <FlatList
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      data={indexes}
      horizontal
      initialScrollIndex={50}
      snapToInterval={itemWidth}
      decelerationRate="fast"
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <Box width={itemWidth}>{renderItem(item)}</Box>}
      keyExtractor={(renderItemIndex) => renderItemIndex.toString()}
      onEndReached={handleEndReached}
      onStartReached={handleStartReached}
      getItemLayout={getItemLayout}
      onEndReachedThreshold={2}
      onStartReachedThreshold={2}
      {...rest}
    />
  );
};
