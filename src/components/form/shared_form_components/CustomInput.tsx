import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../../utils/constants";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: any;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.labelTxt, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconContainer}
          >
            <Feather
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  labelTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  inputFocused: {
    borderColor: colors.purple_500, // Focused border color
    borderWidth: 2, // Focused border width
  },
});

export default CustomInput;
