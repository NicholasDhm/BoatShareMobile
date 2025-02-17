import React from "react";
import { View, Text, TextInput as RNTextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  error?: string;
}

export function TextInput({ title, error, ...rest }: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError]}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
