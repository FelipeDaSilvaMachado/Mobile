
// components/AppInput.js
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function AppInput(props) {
  return <TextInput placeholderTextColor="#9ca3af" {...props} style={[styles.input, props.style]} />
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 14
  }
})
