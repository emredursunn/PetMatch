import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React, { useMemo } from "react";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./Pagination";
import {
  BottomSheetFlatList,
  BottomSheetView,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@gorhom/bottom-sheet";

type Props = {
  data: string[];
};

const Carousel = ({ data }: Props) => {
  const currentPageIndex = useSharedValue(0);
  const onViewableItemsChanged = useMemo(() => {
    return ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        currentPageIndex.value = viewableItems[0].index ?? 0;
      }
      console.log(viewableItems[0].index);
    };
  }, []);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <Image
        key={index}
        source={{ uri: item }}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3 }}
        resizeMode="stretch"
      />
    );
  };

  return (
    <BottomSheetView style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3 }}>
      <BottomSheetFlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        showsHorizontalScrollIndicator={false}
      />
      <Pagination data={data} currentPageIndex={currentPageIndex} />
    </BottomSheetView>
  );
};

export default Carousel;
