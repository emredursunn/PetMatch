import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AnimalFormState, Breed } from "../../../types/Ad";
import { FormikErrors } from "formik";
import { useInfiniteQuery } from "react-query";
import { getBreeds } from "../../../services/api";
import { FlashList } from "@shopify/flash-list";
import RenderItem from "./RenderItem";
import Loading from "./Loading";
import { colors } from "../../../utils/constants";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

type Props = {
  animalType: string;
  value: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<AnimalFormState>>;
};

const PAGE_LIMIT = 25;

const BreedSelector = ({ animalType, value, setFieldValue }: Props) => {
  const [selectedBreed, setSelectedBreed] = useState(value);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  useEffect(() => {
    setFieldValue("breed", selectedBreed);
  }, [selectedBreed]);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ["getBreeds", animalType],
      ({ pageParam = 0 }) => getBreeds(animalType, pageParam),
      {
        keepPreviousData: true,
        getNextPageParam: (lastPage, pages) => {
          // If data which in the last page is smaller than PAGE_LIMIT, finish it.
          return lastPage.length < PAGE_LIMIT ? undefined : pages.length + 1;
        },
        staleTime: 5000 * 60 * 5,
      }
    );

  const loadMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderItem = useCallback(
    ({ item }: { item: Breed }) => (
      <RenderItem
        item={item}
        selectedValue={selectedBreed}
        setSelectedValue={setSelectedBreed}
      />
    ),
    [selectedBreed]
  );

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}
      style={{
        height: SCREEN_HEIGHT * 0.65,
        width: SCREEN_WIDTH,
        justifyContent:'center'
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Let's choose the breed..
      </Text>

      <View
        style={styles.container}
      >
        <FlashList
          data={data?.pages.flat() || []}
          renderItem={renderItem}
          estimatedItemSize={100}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
          ListEmptyComponent={
            // Yükleme sırasında gösterilecek skeleton item'ları
            isFetching && !data?.pages.flat().length ? <Loading /> : null
          }
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "75%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth:2,
    borderColor:colors.purple,
    borderRadius:40,
    backgroundColor: colors.white,
    alignSelf:'center',
    paddingHorizontal: 24,
    paddingVertical: 4,
    shadowOffset:{width:2,height:2},
    shadowColor:colors.black,
    elevation:10,
  },
});

export default BreedSelector;
