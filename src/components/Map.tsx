import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { AnimalMarker } from "../types/AnimalMarker";
import { defaultRegion } from "../utils/constants";
import Zoom from "./Zoom";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
  currentLocation?: Location.LocationObject;
  markers: AnimalMarker[];
  handleMarkerPress: (marker: AnimalMarker) => void;
};

const Map = ({ currentLocation, markers, handleMarkerPress }: Props) => {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>(defaultRegion);

  useEffect(() => {
    setRegion(() =>
      currentLocation
        ? {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        : defaultRegion
    );
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} region={region} zoomEnabled>
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="You"
          >
            <FontAwesome5 name="walking" size={48} color="purple" />
          </Marker>
        )}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.data.title}
            onPress={() => handleMarkerPress(marker)}
          >
            <Image
              source={{ uri: marker.data.images[0] }}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>
      <Zoom region={region} setRegion={setRegion} ref={mapRef} />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
