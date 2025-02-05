import React from "react";
import { View, Text, TextInput as RNTextInput } from "react-native";
import { styles } from "./styles";

type TextInputProps = {
  title?: string;
};

export function TextInput({ title, ...rest }: TextInputProps) {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <RNTextInput style={styles.input} {...rest} />
    </View>
  );
}
