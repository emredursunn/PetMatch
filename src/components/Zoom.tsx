import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import MapView, { Region } from "react-native-maps";

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
    bottom: 120,
    right: 20,
    width: 30,
    height: 70,
    borderWidth: 1,
    backgroundColor: "white",
  },
  zoomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomButtonText: {
    fontSize: 24,
  },
});
