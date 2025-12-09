import CadSindico from '../../../Backend/Cadastros/CadSindico';
import StylesCadastroSindico from './StylesCadastroSindico';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function CadastroSindico({ navigation }) {
    const {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        telefone,
        setTelefone,
        cnpj,
        setCnpj,
        carregando,
        handleCadSindico,
    } = CadSindico(navigation);

    return (
        <View style={StylesCadastroSindico.container}>
            <Text style={StylesCadastroSindico.title}>Cadastro de Síndico</Text>

            <Text style={StylesCadastroSindico.label}>Nome Completo</Text>
            <TextInput
                style={StylesCadastroSindico.input}
                placeholder="Seu nome completo"
                value={nome}
                onChangeText={setNome}
            />

            <Text style={StylesCadastroSindico.label}>E-mail</Text>
            <TextInput
                style={StylesCadastroSindico.input}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={StylesCadastroSindico.label}>Senha</Text>
            <TextInput
                style={StylesCadastroSindico.input}
                placeholder="Crie uma senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Text style={StylesCadastroSindico.label}>Telefone</Text>
            <TextInput
                style={StylesCadastroSindico.input}
                placeholder="(11) 99999-9999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />

            <Text style={StylesCadastroSindico.label}>CPF</Text>
            <TextInput
                style={StylesCadastroSindico.input}
                placeholder="CNPJ somente numeros"
                value={cnpj}
                onChangeText={setCnpj}
                keyboardType="numeric"
            />
            <TouchableOpacity
                style={StylesCadastroSindico.button}
                onPress={async () => {
                    await handleCadSindico();
                    navigation.navigate('Login');
                }}
                disabled={carregando}
            >
                <Text style={StylesCadastroSindico.buttonText}>
                    {carregando ? 'Cadastrando...' : 'Cadastrar Síndico'}
                </Text>
            </TouchableOpacity>
        </View >
    );
};