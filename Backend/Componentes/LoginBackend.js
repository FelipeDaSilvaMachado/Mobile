import { useState } from 'react';
import { Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';

const LoginBackend = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleLoginBackend = async () => {
        if (!email || !senha) {
            return;
        }

        if (carregando) {
            return;
        }

        setCarregando(true);

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            Alert.alert(
                'Sucesso',
                'Login realizado com sucesso!',
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: false }
            );
        } catch (err) {
            console.log('Erro de login', err.message);
            let mensagemErro = 'Erro ao fazer login. Verifique os dados!';

            if (err.code === 'auth/invalid-email') mensagemErro = 'Email inválido';
            if (err.code === 'auth/user-not-found') mensagemErro = 'Usuário não encontrado';
            if (err.code === 'auth/wrong-password') mensagemErro = 'Senha incorreta';

            return {
                mensagemErro
            };
        } finally {
            setCarregando(false);
        }
    };

    const handleSenhaReset = async () => {
        if (!email) {
            Alert.alert('Informe seu email para recuperar a senha!');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'Email para recuperar a senha foi enviado, verifique sua caixa de entrada!');
        } catch (err) {
            Alert.alert('Erro', 'Não foi possivel enviar o email de recuperação de senha!');
        }
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        carregando,
        handleLoginBackend,
        handleSenhaReset,
    };
};

export default LoginBackend;