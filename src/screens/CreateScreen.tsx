import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateScreen = () => {
  const [image, setImage] = useState<any>(null);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    // Cinsiyetler ve cinsler için API çağrısı burada yapılabilir.
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    // API çağrısı ile cinsleri al ve setBreeds ile güncelle
    // Örnek: const response = await fetch('API_URL');
    // const data = await response.json();
    // setBreeds(data);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0].uri;
      if (img) {
        setImage(img);
      }
    }
  };

  const handleSubmit = () => {
    // İlanı gönderme işlemleri burada yapılabilir
    console.log({ image, name, breed, gender, description, color });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Resim Yükle</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Hayvanın ismi"
        value={name}
        onChangeText={setName}
      />

      {/* <Picker
        selectedValue={breed}
        style={styles.picker}
        onValueChange={(itemValue) => setBreed(itemValue)}
      >
        {breeds.map((b, index) => (
          <Picker.Item key={index} label={b.name} value={b.id} />
        ))}
      </Picker> */}

      <View style={styles.radioGroup}>
        <Text>Cinsiyet:</Text>
        <TouchableOpacity
          onPress={() => setGender("male")}
          style={styles.radio}
        >
          <Text>Erkek</Text>
          {gender === "male" && <View style={styles.radioSelected} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("female")}
          style={styles.radio}
        >
          <Text>Kız</Text>
          {gender === "female" && <View style={styles.radioSelected} />}
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Açıklama"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.colorPicker}>
        <Text>Renk Seçimi:</Text>
        <TouchableOpacity
          style={[styles.colorOption, { backgroundColor: "red" }]}
          onPress={() => setColor("red")}
        />
        <TouchableOpacity
          style={[styles.colorOption, { backgroundColor: "blue" }]}
          onPress={() => setColor("blue")}
        />
        {/* Diğer renk seçeneklerini buraya ekleyebilirsiniz */}
      </View>

      <Button title="Gönder" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  description: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  radioGroup: {
    marginBottom: 16,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "blue",
    marginLeft: 8,
  },
  colorPicker: {
    flexDirection: "row",
    marginBottom: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default CreateScreen;
