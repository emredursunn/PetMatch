import { Image, TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Ad } from "../../types/Ad";
import Animated, { FadeOutUp, SlideInLeft } from "react-native-reanimated";
import { showToast } from "../../utils/helperFunctions";
import MultiStepForm from "../../components/form/MultiStepForm";
import { ScrollView } from "react-native-gesture-handler";
import Gradient from "../../components/Gradient";
import { LoadingScreen } from "../../components/Loading";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAdById,
  fetchAdsByIds,
} from "../../services/firebaseService/dbService";

const Ads = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const queryClient = useQueryClient();

  const {
    data: ads,
    isFetching,
    error,
  } = useQuery(["ads", user?.adIds], () => fetchAdsByIds(user?.adIds || []), {
    enabled: !!user,
  });

  const deleteMutation = useMutation(
    (adId: string) => deleteAdById({ adId: adId, userId: user!.uid }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ads");
        showToast("info", "Ad is deleted", "");
      },
    }
  );
  const handleDeleteAd = async (adId: string) => {
    try {
      await deleteMutation.mutateAsync(adId);
    } catch (error) {
      console.error(error);
      showToast("error", "Error", "Try again")
    }
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
  };

  const RenderItem = ({ item, index }: { item: Ad; index: number }) => {
    return (
      <Animated.View
        entering={SlideInLeft.duration(index * 400)}
        exiting={FadeOutUp}
        style={{
          width: "80%",
          borderRadius: 24,
          shadowColor: colors.purple,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
          backgroundColor: "white",
          alignSelf: "center",
          alignItems: "center",
          padding: 16,
          marginVertical: 12,
          gap: 16,
        }}
      >
        <Image
          source={{ uri: item.images[0] }}
          resizeMode="cover"
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>{item.title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            gap: 16,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.fuchsia_800,
              padding: 16,
              borderRadius: 12,
              paddingHorizontal: 24,
            }}
            onPress={() => handleEdit(item)}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.red,
              padding: 16,
              borderRadius: 12,
              paddingHorizontal: 24,
            }}
            onPress={() => handleDeleteAd(item.id!)}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };
  return (
    <>
      {!isFetching ? (
        <Gradient>
          {!editingAd ? (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 36,
                paddingBottom: 200,
              }}
            >
              {ads?.map((ad, index) => (
                <RenderItem key={ad.id} item={ad} index={index} />
              ))}
            </ScrollView>
          ) : (
            <MultiStepForm editingAd={editingAd} setEditingAd={setEditingAd} />
          )}
        </Gradient>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Ads;
