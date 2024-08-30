import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import { colors } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigation/AuthStackNavigator";

export const SignupScreen = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<AuthStackParams>>()
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>PetMatch'e Kaydol</Text>

        <TextInput
          style={styles.input}
          placeholder="İsim"
          autoCapitalize="words"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefon"
          keyboardType="phone-pad"
          placeholderTextColor="#888"
        />

        <View style={styles.checkboxContainer}>
          <Switch
            value={isChecked}
            onValueChange={setIsChecked}
            trackColor={{ false: "#ccc", true: colors.purple_800}}
            thumbColor={colors.white}
            ios_backgroundColor="#ccc"
          />
          <Text style={styles.checkboxText}>
            Sözleşmeyi okudum, kabul ediyorum
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !isChecked && styles.disabledButton]}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Kaydol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('SignIn')} style={styles.signupContainer}>
          <Text style={styles.signupText}>HZaten üye misiniz?</Text>
          <Text style={styles.signupButton}>Giriş yap</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    color: "#333",
  },
  button: {
    backgroundColor: colors.purple_800,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop:8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#888',
    marginRight: 4,
  },
  signupButton: {
    color: colors.purple,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
