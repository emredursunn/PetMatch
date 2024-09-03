import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import MapView, { Region } from "react-native-maps";
import { colors } from "../utils/constants";

type Props = {
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
};

const Zoom = forwardRef<MapView, Props>(({ setRegion, region }, ref) => {
  const zoomIn = () => {
    if (region && ref) {
      const { latitudeDelta, longitudeDelta } = region;
      const newLatitudeDelta = latitudeDelta * 0.9;
      const newLongitudeDelta = longitudeDelta * 0.9;
      const newRegion = {
        ...region,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      };
      setRegion(newRegion);
      (ref as React.RefObject<MapView>).current?.animateToRegion(
        newRegion,
        500
      );
    }
  };

  const zoomOut = () => {
    if (region && ref) {
      const { latitudeDelta, longitudeDelta } = region;
      const newLatitudeDelta = latitudeDelta * 1.1;
      const newLongitudeDelta = longitudeDelta * 1.1;
      const newRegion = {
        ...region,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      };
      setRegion(newRegion);
      (ref as React.RefObject<MapView>).current?.animateToRegion(
        newRegion,
        500
      );
    }
  };

  return (
    <View style={styles.zoomControls}>
      <Pressable style={styles.zoomButton} onPress={zoomIn}>
        <Text style={styles.zoomButtonText}>+</Text>
      </Pressable>
      <Pressable style={styles.zoomButton} onPress={zoomOut}>
        <Text style={styles.zoomButtonText}>-</Text>
      </Pressable>
    </View>
  );
});

export default Zoom;

const styles = StyleSheet.create({
  zoomControls: {
    position: "absolute",
    top: '30%',
    left: 20,
    gap:16
  },
  zoomButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth:0.5,
    borderRadius: 12,
    width: 35,
    height: 35,
    backgroundColor:'rgba(255,255,255,1)',
    shadowColor:colors.black,
    shadowOffset:{height:4,width:2},
    elevation:10,    
  },
  zoomButtonText: {
    fontSize: 24,
  },
});
