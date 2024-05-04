import React from "react";
import { Dimensions, FlatList } from "react-native";

interface Props {
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
    Array.from({ length: 9 }, (_, i) => i - 4),
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
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      data={indexes}
      horizontal
      initialScrollIndex={4}
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => renderItem(item)}
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
