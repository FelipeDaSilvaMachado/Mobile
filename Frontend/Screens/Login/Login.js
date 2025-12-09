import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import LoginBackend from '../../../Backend/Componentes/LoginBackend';
import StyleLogin from './StyleLogin';

export default function Login({ navigation }) {
  const [tipo, setTipo] = useState('engenheiro'); // 'engenheiro' | 'sindico'

  const {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    handleLoginBackend,
    // handleSenhaReset,
  } = LoginBackend(navigation);

  return (
    <View style={StyleLogin.root}>
      <View style={StyleLogin.card}>
        <Text style={StyleLogin.title}>Daily Inspection
        </Text>
        <Text style={StyleLogin.subtitle}>Acesse aqui</Text>

        <View style={StyleLogin.tabs}>
          <TouchableOpacity
            style={[StyleLogin.tab, tipo === 'engenheiro' && StyleLogin.tabActive]}
            onPress={() => setTipo('engenheiro')}
          >
            <Text style={[StyleLogin.tabText, tipo === 'engenheiro' && StyleLogin.tabTextActive]}>
              Engenheiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[StyleLogin.tab, tipo === 'sindico' && StyleLogin.tabActive]}
            onPress={() => setTipo('sindico')}
          >
            <Text style={[StyleLogin.tabText, tipo === 'sindico' && StyleLogin.tabTextActive]}>
              Síndico
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={StyleLogin.label}>E-mail</Text>
        <TextInput
          style={StyleLogin.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={StyleLogin.label}>Senha</Text>
        <TextInput
          style={StyleLogin.input}
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity
          style={StyleLogin.button}
          onPress={async () => {
            await handleLoginBackend();
            navigation.navigate('DashboardEngenheiro')
          }}
          disabled={carregando}
        >
          <Text style={StyleLogin.buttonText}>
            Entrar como {tipo === 'engenheiro' ? 'Engenheiro' : 'Síndico'}
            <Text style={[StyleLogin.botaoTexto,
            carregando && { backgroundColor: '#ccc' }
            ]}>
              {/* {carregando ? 'Acessando Sistema...' : 'Logar'} */}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, alignItems: 'center', marginTop: 15 }}
          onPress={() => navigation.navigate(tipo === 'engenheiro' ? 'CadastroEngenheiro' : 'CadastroSindico')}
        >
        <Text style={{ color: '#001F3F', fontWeight: '600' }}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
    </View >
  );
};