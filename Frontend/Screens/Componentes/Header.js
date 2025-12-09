// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StylesHeader from './StylesHeader';

export default function Header({ currentUser, onLogout }) {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Image 
            source={require('../../assets/img/logo/logoDaily.png')}
            style={StylesHeader.logoHeader}
          />
        </View>
        <Text style={StylesHeader.title}>
          Controle de Obras
        </Text>
        <Text style={StylesHeader.subtitle}>
          Olá, {currentUser?.nome || 'Usuário'} ({currentUser?.tipo})
        </Text>
      </View>

      <TouchableOpacity style={StylesHeader.logoutButton} onPress={'SplashScreen'}>
        <Ionicons name="log-out-outline" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};