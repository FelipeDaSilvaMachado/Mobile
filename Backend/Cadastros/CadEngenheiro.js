import { useState } from 'react';
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase/Firebase';

const CadEngenheiro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crea, setCrea] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [carregando, setCarregando] = useState(false);

    const mascararDados = (dado) => {
        if (!dado) {
            return ''; // Proteção contra dados vazios
        }

        const str = String(dado).trim();
        const len = str.length;
        if (len <= 4) {
            return str;
        }
        const inicio = str.substring(0, 2);
        const fim = str.substring(len - 2);
        const meioMascarado = '*'.repeat(len - 4);
        return inicio + meioMascarado + fim;
    };

    const validarCampos = () => {
        if (!nome || !email || !senha || !telefone || !crea || !cnpj) {
            Alert.alert('Atenção', 'Preencha todos os campos!');
            return false;
        }

        // Validação segura do email
        if (typeof email != 'string' || email.indexOf('@') === -1) {
            Alert.alert('Atenção', 'Digite um email válido!');
            return false;
        }

        if (senha.length < 6) {
            Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres!');
            return false;
        }
        return true;
    };

    const handleCadastro = async () => {
        if (carregando) {
            return;
        }

        if (!validarCampos()) {
            return;
        }

        setCarregando(true);

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, senha);
            const { user } = credencialUsuario;
            const creaMascarado = mascararDados(crea);
            const cnpjMascarado = mascararDados(cnpj);

            await setDoc(doc(db, 'users', user.uid), {
                nome: nome,
                email: email,
                telefone: telefone, // Adicionei o telefone que estava faltando
                crea: creaMascarado,
                cnpj: cnpjMascarado,
                dataCriacao: new Date(), // Boa prática adicionar timestamp
                uid: user.uid, // Referência ao ID do usuário
            });

            Alert.alert(
                'Sucesso',
                'Usuário cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                    },
                ],
                { cancelable: false }
            );
        } catch (err) {
            console.log("Erro completo:", err);
            let mensagemErro = 'Não foi possível cadastrar, tente novamente!';

            if (err && err.code) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        mensagemErro = 'Formato de e-mail inválido.';
                        break;
                    case 'auth/email-already-in-use':
                        mensagemErro = 'Este e-mail já está em uso.';
                        break;
                    case 'auth/weak-password':
                        mensagemErro = 'A senha deve ter pelo menos 6 caracteres.';
                        break;
                    case 'auth/network-request-failed':
                        mensagemErro = 'Erro de conexão. Verifique sua internet.';
                        break;
                    default:
                        mensagemErro = `Erro: ${err.code}`;
                        break;
                }
            } else if (err && err.message) {
                mensagemErro = err.message;
            }
            Alert.alert('Erro', mensagemErro);
        } finally {
            setCarregando(false);
        }
    };

    // Retorna todos os estados e funções para a interface usar
    return {
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
        handleCadastro
    };
};

export default CadEngenheiro;