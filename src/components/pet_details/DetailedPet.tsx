import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CustomBox from "./CustomBox";
import { distance } from "../../utils/helperFunctions";
import { AnimalMarker } from "../../types/AnimalMarker";
import useLocation from "../../hooks/useLocation";
import { LatLng } from "react-native-maps";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type Props = {
  data: AnimalMarker;
};

const DetailedPet = ({ data }: Props) => {
  const { location } = useLocation();
  const myCoords = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  };
  const petCoords = { latitude: data.latitude, longitude: data.longitude };
  const [distanceAway, setDistanceAway] = useState<number | null>(null);

  useEffect(() => {
    if (myCoords.latitude && myCoords.longitude) {
      const distanceValue = distance(myCoords as LatLng, petCoords);
      setDistanceAway(distanceValue);
    }
  }, [myCoords, petCoords]);

  return (
    <View style={styles.box}>
      <View style={styles.detailsContainer}>
        <CustomBox>
          <Text style={styles.text}>{data.data.age}</Text>
        </CustomBox>
        <CustomBox>
          <View style={styles.colorsContainer}>
            {data.data.colors.map((color) => (
              <Text key={color} style={styles.text}>
                {color}
              </Text>
            ))}
          </View>
        </CustomBox>
        <CustomBox>
          <Text style={styles.text}>{data.data.species}</Text>
        </CustomBox>
      </View>
      {distanceAway ? (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.distanceText}>{distanceAway.toFixed(1)} km away </Text>
          <Text>
            <EvilIcons name="location" size={28} color="black" />
          </Text>
        </View>
      ) : (
        <Text>
        Calculating distance...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "90%",
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    gap: 12,
  },
  detailsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12,
  },
  colorsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  text: {
    color: "rgba(78, 44, 191, 0.85)",
    fontSize: 16,
  },
  distanceText: {
    paddingLeft: 6,
    color: "black",
    fontSize: 16,
  },
});

export default DetailedPet;
