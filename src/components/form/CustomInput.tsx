import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

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
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  inputFocused: {
    borderColor: "rgba(78, 44, 191, 0.42)", // Focused border color
    borderWidth: 2, // Focused border width
  },
});

export default CustomInput;
