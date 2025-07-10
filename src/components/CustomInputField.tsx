import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { useState } from 'react'
import { Shadow } from 'react-native-shadow-2';

type CustomTextInputFieldProps = {
    placeholder?: string;
} & TextInputProps;

const CustomInputField = ({placeholder, style, ...props} : CustomTextInputFieldProps ) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View>
      <Shadow
        distance={isFocused ? 5 : 0}
        offset={isFocused ? [3, 4] : [0,0]}
        style={{ width: '100%' }}
        startColor={isFocused ? '#00000010' : 'transparent'}
      >
        <TextInput
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, isFocused ? styles.inputFocus : {} , style ]}
            {...props}
        />
      </Shadow>
    </View>
  )
}

export default CustomInputField

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  inputFocus: {
    borderColor: '#2196F3',
    borderWidth: 1.5,
  }
})