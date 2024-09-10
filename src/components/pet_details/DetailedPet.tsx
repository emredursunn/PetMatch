import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CustomBox from "./CustomBox";
import { distance } from "../../utils/helperFunctions";
import useLocation from "../../hooks/useLocation";
import { LatLng } from "react-native-maps";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { colors } from "../../utils/constants";
import { Ad } from "../../types/Ad";
import ColorItem from "../form/color_form/ColorItem";

type Props = {
  ad: Ad;
};

const DetailedPet = ({ ad }: Props) => {
  const { location } = useLocation();
  const myCoords = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  };
  const petCoords = {
    latitude: ad.location.coordinates.latitude,
    longitude: ad.location.coordinates.longitude,
  };
  const [distanceAway, setDistanceAway] = useState<number | null>(null);

  // useEffect(() => {
  //   if (myCoords.latitude && myCoords.longitude) {
  //     const distanceValue = distance(myCoords as LatLng, petCoords);
  //     setDistanceAway(distanceValue);
  //   }
  // }, [myCoords, petCoords]);

  return (
    <View style={styles.box}>
      <View style={styles.detailsContainer}>
        <CustomBox>
          <Text style={styles.text}>🎂 {ad.age}</Text>
        </CustomBox>
        <CustomBox>
          <View style={styles.colorsContainer}>
            {ad.colors.map((color, index) => (
              <ColorItem
                key={color.name}
                color={color}
                index={index}
                customStyle={{ width: 30, height: 30 }}
              />
            ))}
          </View>
        </CustomBox>
      </View>
      {distanceAway ? (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.distanceText}>
            {distanceAway.toFixed(1)} km away{" "}
          </Text>
          <Text>
            <EvilIcons name="location" size={28} color="black" />
          </Text>
        </View>
      ) : (
        <Text>Calculating distance...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    gap: 12,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  text: {
    textAlign: "center",
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
  distanceText: {
    paddingLeft: 6,
    color: "black",
    fontSize: 16,
  },
});

export default DetailedPet;
