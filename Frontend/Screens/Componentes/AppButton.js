
// components/AppButton.js
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  const isOutline = variant === 'outline'
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonPrimary,
        style
      ]}
    >
      <Text style={isOutline ? styles.textOutline : styles.textPrimary}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPrimary: {
    backgroundColor: '#2563eb'
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#2563eb',
    backgroundColor: '#fff'
  },
  textPrimary: {
    color: '#fff',
    fontWeight: '600'
  },
  textOutline: {
    color: '#2563eb',
    fontWeight: '600'
  }
})
