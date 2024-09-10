import {
  View,
  Text,
  Image,
  Pressable,
  Switch,
  StyleSheet,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/constants";
import Gradient from "../../components/Gradient";
import { signOut } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParams } from "../../navigation/ProfileStack";

type Item = {
  key: string;
  title: string;
  icon: string;
  hasSwitch?: boolean;
  switchState?: boolean;
  onToggleSwitch?: () => void;
  onPress?: () => void;
};

type Section = {
  title: string;
  data: Item[];
};

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [callsEnabled, setCallsEnabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:RootState) => state.auth.user)
  const {navigate} = useNavigation<NativeStackNavigationProp<ProfileStackParams,"Profile">>()

  const handleLogout = () => {
    dispatch(signOut())
  }

  const sections: Section[] = [
    {
      title: "Ads",
      data: [
        {
          key: "1",
          title: "Ads",
          icon: "🐶",
          onPress: () => {
            navigate("Ads")
          },
        },
        {
          key: "2",
          title: "Help",
          icon: "ℹ️",
          onPress: () => {
           // navigate destek
          },
        },
      ],
    },
    {
      title: "Preferences",
      data: [
        {
          key: "3",
          title: "Notifications",
          icon: "🔔",
          hasSwitch: true,
          switchState: notificationsEnabled,
          onToggleSwitch: () =>
            setNotificationsEnabled((prevState) => !prevState),
        },
        {
          key: "4",
          title: "Calls",
          icon: "📞",
          hasSwitch: true,
          switchState: callsEnabled,
          onToggleSwitch: () => setCallsEnabled((prevState) => !prevState),
        },
        {
          key: "5",
          title: "Log out",
          icon: "🅾️",
          onPress: () => handleLogout()
        },
      ],
    },
  ];

  const handleEdit = () => {};

  const renderItem = ({
    item,
    index,
    data,
  }: {
    item: Item;
    index: number;
    data: readonly Item[];
  }) => (
    <TouchableOpacity
      key={item.key}
      style={[
        styles.itemContainer,
        { borderBottomWidth: data[index + 1] ? 1 : 0 },
      ]}
      onPress={item.onPress}
    >
      <View style={styles.itemContent}>
        <Text style={{ fontSize: 16 }}>{item.icon} </Text>
        <Text style={{ fontSize: 16 }}>{item.title}</Text>
      </View>
      {item.hasSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "lightgreen" }}
          thumbColor={colors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={item.onToggleSwitch}
          value={item.switchState}
        />
      ) : null}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<Item>;
  }) => <Text style={styles.sectionHeader}>{section.title}</Text>;

  const renderSection = ({ section }: { section: SectionListData<Item> }) => (
    <>
      {renderSectionHeader({ section })}
      <View style={styles.sectionContainer}>
        {section.data.map((item, index, data) =>
          renderItem({ item, index, data })
        )}
      </View>
    </>
  );

  return (
    <Gradient>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={user?.userPic ? { uri: user.userPic } : require("../../../assets/user.jpg")}
          resizeMode="cover"
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 4 }}
        />
        <Text
          style={{
            color: colors.black,
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          {user?.fullName}
        </Text>
        <Pressable
          onPress={handleEdit}
          style={{
            width: 100,
            height: 30,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.black,
          }}
        >
          <Text
            style={{ color: colors.white, fontSize: 12, fontWeight: "bold" }}
          >
            Edit
          </Text>
        </Pressable>

        <View style={[{ width: "100%",height:'70%' }, styles.container]}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.key}
            renderItem={() => null} // Her bir öğeyi renderSection içinde render ediyoruz
            renderSectionHeader={renderSection}
            contentContainerStyle={{paddingBottom:100}}
          />

        </View>
      </View>
    </Gradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 15,
    backgroundColor: "#fff", // Arka plan rengi
    borderRadius: 10, // Kenarları yuvarlatmak için
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionFooter: {
    height: 15, // İki konteynır arasında boşluk bırakmak için
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "#ccc",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap:8
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.black,
  },
});
