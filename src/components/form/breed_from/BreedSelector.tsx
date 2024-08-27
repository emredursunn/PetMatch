import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Breed } from "../../../types/AnimalData";
import { FormikErrors } from "formik";
import { AnimalFormState } from "../../../types/AnimalFormState";
import { useInfiniteQuery } from "react-query";
import { getBreeds } from "../../../service/api";
import { FlashList } from "@shopify/flash-list";
import RenderItem from "./RenderItem";
import Loading from "./Loading";
import { colors } from "../../../utils/constants";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

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
    <View
      style={{
        height: SCREEN_HEIGHT * 0.8,
        width: SCREEN_WIDTH,
        paddingTop: 100,
        justifyContent: "center",
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
        CİNSİNİ DE SEÇELİM..
      </Text>

      <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.container}>
        {/* <FlashList
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
        /> */}
      
      <Loading />
      </Animated.View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor:colors.white,
    padding:24
  },
});

export default BreedSelector;
