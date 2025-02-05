import React from "react";
import { View, Text, TextInput as RNTextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type Props = TextInputProps & {
  title?: string;
};

export function TextInput({ title, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <RNTextInput style={styles.input} {...rest} />
    </View>
  );
}
