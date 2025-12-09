import CadEngenheiro from '../../../Backend/Cadastros/CadEngenheiro';
import StylesCadastroEngenheiro from "./SytleCadastroEngenheiro";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";

export default function CadastroEngenheiro({ navigation }) {
    const {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        telefone,
        setTelefone,
        crea,
        setCrea,
        cnpj,
        setCnpj,
        carregando,
        handleCadEngenheiro
    } = CadEngenheiro(navigation);

    return (
        <View style={StylesCadastroEngenheiro.container}>
            <StatusBar backgroundColor="#EAF0FA" barStyle="dark-content" />

            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center'
            }}>
                {/* Header */}
                <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => navigation.goBack()}>
                    <Text style={StylesCadastroEngenheiro.voltar}>← Voltar</Text>
                </TouchableOpacity>

                <View style={StylesCadastroEngenheiro.header}>
                    <Text style={StylesCadastroEngenheiro.titulo}>Cadastro de Engenheiro</Text>
                    <Text style={StylesCadastroEngenheiro.subtitulo}>Preencha seus dados para se cadastrar</Text>
                </View>

                {/* Card Principal */}
                <View style={StylesCadastroEngenheiro.card}>
                    <Text style={StylesCadastroEngenheiro.label}>Nome Completo</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="Seu nome completo"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={StylesCadastroEngenheiro.label}>E-mail</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={StylesCadastroEngenheiro.label}>Senha</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="Sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <Text style={StylesCadastroEngenheiro.label}>Telefone</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="(11) 99999-9999"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <Text style={StylesCadastroEngenheiro.label}>CREA</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="Número do CREA"
                        value={crea}
                        onChangeText={setCrea}
                    />

                    <Text style={StylesCadastroEngenheiro.label}>CNPJ</Text>
                    <TextInput
                        style={StylesCadastroEngenheiro.input}
                        placeholder="CNPJ somente números"
                        value={cnpj}
                        onChangeText={setCnpj}
                        keyboardType="numeric"
                    />

                    {/* Botão de Cadastro */}
                    <TouchableOpacity
                        style={[
                            StylesCadastroEngenheiro.botao,
                            carregando && { backgroundColor: '#ccc' }
                        ]}
                        onPress={async () => {
                            await handleCadEngenheiro();
                            navigation.navigate('Login');
                        }}
                        disabled={carregando}
                    >
                        <Text style={StylesCadastroEngenheiro.botaoTexto}>
                            {carregando ? 'Cadastrando...' : 'Cadastrar Engenheiro'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
};