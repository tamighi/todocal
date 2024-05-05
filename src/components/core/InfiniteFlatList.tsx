import React from "react";

import { Dimensions, FlatList, FlatListProps, View } from "react-native";

interface Props extends Partial<Omit<FlatListProps<number>, "renderItem">> {
  renderItem: (index: number) => React.ReactElement | null;
  itemWidth?: number;
  itemOffset?: number;
}

const WIDTH = Dimensions.get("window").width;

export const InfiniteFlatList = ({
  renderItem,
  itemWidth = WIDTH,
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
      offset: itemWidth * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      renderItem={({ item }) => (
        <View style={{ width: itemWidth }}>{renderItem(item)}</View>
      )}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
      data={indexes}
      horizontal
      initialScrollIndex={50}
      snapToInterval={itemWidth}
      decelerationRate="fast"
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
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
