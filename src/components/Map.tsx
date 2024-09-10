import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { colors, defaultRegion } from "../utils/constants";
import Zoom from "./Zoom";
import { Ad, Cluster } from "../types/Ad";
import { groupAdsByDistance } from "../utils/helperFunctions";

type Props = {
  currentLocation?: Location.LocationObject;
  ads: Ad[];
  handleAdPress: (ad: Ad) => void;
  handleRefresh : () => void
};

const Map = ({ currentLocation, ads, handleAdPress, handleRefresh }: Props) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [region, setRegion] = useState<Region>(defaultRegion);
  const [zoomLevel, setZoomLevel] = useState<number>(region.latitudeDelta);

  useEffect(() => {
    const calculateZoomLevel = () => {
      const zoomThreshold = 0.6; // threshold value for zoom level
      if (zoomLevel > zoomThreshold) {
        const maxDistance = 10; // 10 km
        const updatedClusters = groupAdsByDistance(ads, maxDistance);
        setClusters(updatedClusters);
      } else {
        setClusters(
          ads.map((ad) => ({
            latitude: ad.location.coordinates.latitude,
            longitude: ad.location.coordinates.longitude,
            ads: [ad],
          }))
        );
      }
    };

    calculateZoomLevel();
  }, [region, ads, zoomLevel]);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    setZoomLevel(newRegion.latitudeDelta);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        zoomEnabled
      >
        {clusters.map((cluster, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: cluster.latitude,
              longitude: cluster.longitude,
            }}
            title={cluster.ads.length > 1 ? undefined : cluster.ads[0].title}
            onPress={() =>
              cluster.ads.length === 1 && handleAdPress(cluster.ads[0])
            }
          >
            {cluster.ads.length > 1 ? (
              <View
                style={[
                  styles.clusterMarker,
                ]}
              >
                <Text style={styles.clusterText}>{cluster.ads.length}</Text>
              </View>
            ) : (
              <Image
                source={{ uri: cluster.ads[0].images[0] }}
                style={styles.imageMarker}
                resizeMode="cover"
              />
            )}
          </Marker>
        ))}
      </MapView>
      <Zoom region={region} setRegion={setRegion} handleRefresh={handleRefresh} />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  imageMarker: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  clusterMarker: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple_700,
  },
  clusterText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
