import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Carousel from "./carousel/Carousel";
import DetailedPet from "./pet_details/DetailedPet";
import Description from "./pet_details/Description";
import { makePhoneCall } from "../utils/helperFunctions";
import { colors } from "../utils/constants";
import Header from "./pet_details/Header";
import { Easing } from "react-native-reanimated";
import { Ad } from "../types/Ad";

type Props = {
  ad: Ad;
};

const BottomSheet = forwardRef<BottomSheetModal, Props>(({ ad }, ref) => {
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
          backgroundColor: colors.white,
          paddingBottom: 100,
        }}
      >
        <BottomSheetView>
          <Carousel images={ad.images} />
          <Header ad={ad} />
        </BottomSheetView>
        <DetailedPet ad={ad} />
        <Description ad={ad} />
        <Pressable
          onPress={() => makePhoneCall(ad.contact)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Adopt!</Text>
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
    alignSelf: "center",
    backgroundColor: colors.purple_700,
    paddingVertical: 16,
    width: "90%",
    marginTop:20,
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
