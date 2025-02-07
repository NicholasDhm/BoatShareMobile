import React from 'react';
import { TextInput as RNTextInput, View, Text, TextInputProps } from 'react-native';
import { styles } from './styles';

interface NumberInputProps extends Omit<TextInputProps, 'onChangeText'> {
  title: string;
  error?: string;
  onChangeNumber: (number: number) => void;
}

export function NumberInput({ title, error, onChangeNumber, value, ...rest }: NumberInputProps) {
  const handleChangeText = (text: string) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Convert to number or 0 if empty
    const number = numericValue ? parseInt(numericValue) : 0;
    
    onChangeNumber(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNTextInput
        style={[styles.input, error && styles.inputError]}
        keyboardType="numeric"
        value={value?.toString()}
        onChangeText={handleChangeText}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
} 