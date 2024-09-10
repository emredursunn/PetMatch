import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../components/BottomSheet";
import { showToast } from "../utils/helperFunctions";
import { Ad } from "../types/Ad";
import { getAllAds } from "../services/firebaseService/dbService";
import { LoadingScreen } from "../components/Loading";

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const ads = await getAllAds();
        setAllAds(ads);
      } catch (error) {
        showToast("error", "Hata meydana geldi", "");
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [refresh]);

  if (errorMsg) {
    showToast("error", "Konum hatası", errorMsg);
  }

  const handleRefresh = () => {
    setRefresh(value => !value)
  }

  const handleAdPress = (ad: Ad) => {
    setSelectedAd(ad);
    bottomSheetModalRef.current?.present();
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <Map
            currentLocation={location}
            ads={allAds}
            handleRefresh={handleRefresh}
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
