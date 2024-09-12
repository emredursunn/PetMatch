import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../components/BottomSheet";
import { showToast } from "../utils/helperFunctions";
import { Ad } from "../types/Ad";
import { getAllAds } from "../services/firebaseService/dbService";
import { LoadingScreen } from "../components/Loading";
import { useQuery } from "react-query";

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { data, isFetching, refetch } = useQuery("ads", getAllAds);

  if (errorMsg) {
    showToast("error", "Konum hatası", errorMsg);
  }

  const handleAdPress = (ad: Ad) => {
    setSelectedAd(ad);
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={styles.container}>
      {!isFetching ? (
        <>
          <Map
            currentLocation={location}
            ads={data || []}
            handleRefresh={refetch}
            handleAdPress={handleAdPress}
          />
          {selectedAd && (
            <BottomSheet ad={selectedAd} ref={bottomSheetModalRef} />
          )}
        </>
      ) : (
        <LoadingScreen />
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
