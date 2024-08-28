import { Alert, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheet from "../components/BottomSheet";
import { AnimalMarker } from "../types/AnimalMarker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { dummyPetList } from "../utils/dummy";

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const [selectedMarker, setSelectedMarker] = useState<AnimalMarker | null>(
    null
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  if (errorMsg) {
    Alert.alert(errorMsg);
  }

  const handleMarkerPress = (marker: AnimalMarker) => {
    setSelectedMarker(marker);
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <Map
        currentLocation={location}
        markers={dummyPetList}
        handleMarkerPress={handleMarkerPress}
      />
      {selectedMarker && (
        <BottomSheet marker={selectedMarker} ref={bottomSheetModalRef} />
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
