import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import LogEngenheiro from '../../../Backend/Componentes/LogEngenheiro';
import StyleLoginEngenheiro from './StyleLoginEngenheiro';

export default function LoginEngenheiro({ navigation }) {
  const [tipo, setTipo] = useState(''); // 'engenheiro' | 'sindico'

  const {
    email,
    setEmail,
    senha,
    setSenha,
  } = LogEngenheiro(navigation);

  return (
    <View style={StyleLoginEngenheiro.root}>
      <View style={StyleLoginEngenheiro.card}>
        <Text style={StyleLoginEngenheiro.title}>Daily Inspection
        </Text>
        <Text style={StyleLoginEngenheiro.subtitle}>Acesse aqui</Text>

        <View style={StyleLoginEngenheiro.tabs}>
          <TouchableOpacity
            style={[StyleLoginEngenheiro.tab, tipo === 'engenheiro' && StyleLoginEngenheiro.tabActive]}
            onPress={() => setTipo('engenheiro')}
          >
            <Text style={[StyleLoginEngenheiro.tabText, tipo === 'engenheiro' && StyleLoginEngenheiro.tabTextActive]}>
              Engenheiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[StyleLoginEngenheiro.tab, tipo === 'sindico' && StyleLoginEngenheiro.tabActive]}
            onPress={() => setTipo('sindico')}
          >
            <Text style={[StyleLoginEngenheiro.tabText, tipo === 'sindico' && StyleLoginEngenheiro.tabTextActive]}>
              Síndico
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={StyleLoginEngenheiro.label}>E-mail</Text>
        <TextInput
          style={StyleLoginEngenheiro.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={StyleLoginEngenheiro.label}>Senha</Text>
        <TextInput
          style={StyleLoginEngenheiro.input}
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity
          style={StyleLoginEngenheiro.button}
          onPress={async () => {
            navigation.navigate('DashboardEngenheiro')
          }}
        >

          <Text style={StyleLoginEngenheiro.buttonText}>
            Entrar como {tipo === 'engenheiro' ? 'Engenheiro' : 'Síndico'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};