import React from "react";
import { Dimensions, FlatList, ViewToken } from "react-native";

interface Props {
  renderItem: (index: number) => React.ReactElement | null;
}

type OnViewableItemsChangedInfo = {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
};

const WIDTH = Dimensions.get("window").width;

export const InfiniteFlatList = ({ renderItem, ...rest }: Props) => {
  const flatListRef = React.useRef<FlatList>(null);
  const [indexes, setIndexes] = React.useState<number[]>(
    Array.from({ length: 9 }, (_, i) => i - 4),
  );

  const handleEndReached = () => {
    const lastIndex = indexes.at(-1) as number;

    const newData = Array.from({ length: 10 }, (_, i) => lastIndex + i + 1);
    setIndexes([...indexes, ...newData]);
  };

  const handleStartReached = () => {
    const firstIndex = indexes.at(0) as number;

    const newIndexes = Array.from(
      { length: 10 },
      (_, i) => firstIndex - (i + 1),
    );

    setIndexes([...newIndexes.reverse(), ...indexes]);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: WIDTH,
    offset: WIDTH * index,
    index,
  });

  return (
    <FlatList
      ref={flatListRef}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      data={indexes}
      horizontal
      initialScrollIndex={4}
      style={{ flex: 1 }}
      snapToInterval={WIDTH}
      decelerationRate="fast"
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
