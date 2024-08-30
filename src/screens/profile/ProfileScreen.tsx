import {
  View,
  Text,
  Image,
  Pressable,
  Switch,
  StyleSheet,
  SectionList,
  SectionListData,
  useWindowDimensions,
  SectionListRenderItem,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/constants";

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
  const defaultPhoto =
    "data:image/jpeg;base64,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";
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [callsEnabled, setCallsEnabled] = useState(false);

  const sections: Section[] = [
    {
      title: "İlanlarım",
      data: [
        {
          key: "1",
          title: "İlanlarım",
          icon: "🐶",
          onPress: () => {
            /* Navigate to "İlanlarım" page */
          },
        },
        {
          key: "2",
          title: "Destek",
          icon: "ℹ️",
          onPress: () => {
            /* Navigate to "Destek" page */
          },
        },
      ],
    },
    {
      title: "Tercihlerim",
      data: [
        {
          key: "3",
          title: "Bildirimler",
          icon: "🔔",
          hasSwitch: true,
          switchState: notificationsEnabled,
          onToggleSwitch: () =>
            setNotificationsEnabled((prevState) => !prevState),
        },
        {
          key: "4",
          title: "Aramalar",
          icon: "📞",
          hasSwitch: true,
          switchState: callsEnabled,
          onToggleSwitch: () => setCallsEnabled((prevState) => !prevState),
        },
        {
          key: "5",
          title: "Çıkış Yap",
          icon: "🅾️",
          onPress: () => {
            /* Handle log out */
          },
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
    <Pressable
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
    </Pressable>
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{ uri: defaultPhoto }}
        resizeMode="cover"
        style={{ width: 100, height: 100, borderRadius: 50,marginBottom:4 }}
      />
      <Text style={{ color: colors.black, fontSize: 16, fontWeight: "bold",marginBottom:4 }}>
        EMRE DURSUN
      </Text>
      <Pressable
        onPress={handleEdit}
        style={{
          width: 100,
          height: 30,
          borderRadius:8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.black,
        }}
      >
        <Text style={{ color: colors.white, fontSize: 12, fontWeight: "bold" }}>
          Düzenle
        </Text>
      </Pressable>

      <View style={[{ width: "100%" }, styles.container]}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.key}
          renderItem={() => null} // Her bir öğeyi renderSection içinde render ediyoruz
          renderSectionHeader={renderSection}
        />
      </View>
    </View>
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
