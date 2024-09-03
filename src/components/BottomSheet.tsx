import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ANIMATION_EASING,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AnimalMarker } from "../types/AnimalMarker";
import Carousel from "./carousel/Carousel";
import DetailedPet from "./pet_details/DetailedPet";
import Description from "./pet_details/Description";
import { makePhoneCall } from "../utils/helperFunctions";
import { colors } from "../utils/constants";
import Header from "./pet_details/Header";
import { Easing, ReduceMotion } from "react-native-reanimated";

type Props = {
  marker: AnimalMarker;
};

const BottomSheet = forwardRef<BottomSheetModal, Props>(({ marker }, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      style={styles.container}
      enableContentPanningGesture={false}
      animateOnMount={true}
      animationConfigs={{easing:Easing.linear}}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.bottom_background,
          paddingBottom: 250,
        }}
      >
        <BottomSheetView>
          <Carousel data={marker.data.images} />
          <Header data={marker.data} />
        </BottomSheetView>
        <DetailedPet data={marker} />
        <Description data={marker.data} />
        <Pressable
          onPress={() => makePhoneCall(marker.data.contact)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Sahiplen</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
    backgroundColor: colors.purple_700,
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default BottomSheet;
