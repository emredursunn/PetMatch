import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { colors } from "../../../utils/constants";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: any;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight:'bold',
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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
