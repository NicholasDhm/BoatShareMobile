import React, { useState } from "react";
import { View, Text, TextInput as RNTextInput, TextInputProps, Pressable } from "react-native";
import { styles } from "./styles";
import { colors } from "../../themes/colors";

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  onIconPress?: () => void;
}

export function TextInput({ 
  title, 
  error, 
  success, 
  icon, 
  onIconPress,
  editable = true,
  ...rest 
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            success && styles.inputSuccess,
            !editable && styles.inputDisabled,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          placeholderTextColor={colors.grayMedium}
          selectionColor={colors.prussianBluePrimary}
          {...rest}
        />
        {icon && (
          <Pressable 
            style={styles.icon} 
            onPress={onIconPress}
            disabled={!onIconPress}
          >
            {icon}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}