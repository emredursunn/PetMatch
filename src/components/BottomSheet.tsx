import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AnimalMarker } from "../types/AnimalMarker";
import Carousel from "./carousel/Carousel";
import DetailedPet from "./pet_details/DetailedPet";
import Description from "./pet_details/Description";
import { makePhoneCall } from "../utils/helperFunctions";
import { LinearGradient } from "expo-linear-gradient";
import CustomBox from "./pet_details/CustomBox";
import Ionicons from "@expo/vector-icons/Ionicons";
import Gradient from "./pet_details/Gradient";

type Props = {
  data: AnimalMarker;
};

const BottomSheet = forwardRef<BottomSheetModal, Props>(({ data }, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      style={styles.container}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "rgba(197, 197, 197, 0.2)",
          paddingBottom: 70,
        }}
      >
        <BottomSheetView>
          <Carousel data={data.data.images} />
          <Gradient data={data.data}/>
        </BottomSheetView>
        <DetailedPet data={data.data}/>
        <Description data={data.data} />
      </BottomSheetScrollView>
      <Pressable
        onPress={() => makePhoneCall(data.data.contact)}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Sahiplen!</Text>
      </Pressable>
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
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(78, 44, 191, 0.72)",
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
