import ApiConfig from '../../../Backend/Database/ApiConfig';
import { auth } from '../../../Backend/Firebase/Firebase';

export const ServicoMaoObra = {
    fetchDashboardData: async () => {
        try {
            const { currentUser } = auth();
            if (!currentUser) {
                throw new Error('Usuário não autenticado');
            }

            const token = await currentUser.getIdToken();
            const userId = currentUser.id;

            const [
                nomeResponse,
                valor_horaResponse,
                hora_trabalhadaResponse,
                statusResponse,
                funcaoRespose,
                especialidadeResponse,
                obraResponse,
            ] = await Promise.all([
                ApiConfig.get('/funcionarios/${userId}', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),
                ApiConfig.post('/funcionarios', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }                    
                }),
                ApiConfig.put('/funcionarios/${userId}', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }                    
                }),
                ApiConfig.delete('/funcionarios/${userId}', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }                    
                }),
            ]);

            return {
                Nome: nomeResponse.data,
                Valor_Hora: valor_horaResponse.data,
                Hora_Trabalhada: hora_trabalhadaResponse.data,
                Status: statusResponse.data,
                Função: funcaoRespose.data,
                Especialidade: especialidadeResponse.data,
                Obra: obraResponse.data,
            };

        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            throw error;
        }
    },

    fetchDashboardDataSingle: async () => {
        try {
            const { currentUser } = auth();
            if (!currentUser) {
                throw new Error('Usuário não autenticado');
            }

            const token = await currentUser.getIdToken();

            let response;

            if (currentUser.tipo === 'engenheiro') {
                response = await ApiConfig.get('/dashboard/engenheiro', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else if (currentUser.tipo === 'sindico') {
                response = await ApiConfig.get('/dashboard/sindico', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            return error;
        }
    }
};

// const getMockData = () => ({
//     funcionario: [
//         {
//             id: 1,
//             nome: 'João Evangelista',
//             valor_hora: 100,
//             hora_trabalhada: 44,
//             status: 'ativo',
//             funcao: 'Mestre de Obra',
//             especialidade: 'Azulejista',
//             obra: 'Condominio Alagoas',
//         },
//         {
//             id: 1,
//             nome: 'Pedro Paulo',
//             valor_hora: 50,
//             hora_trabalhada: 44,
//             status: 'ativo',
//             funcao: 'Servente',
//             especialidade: 'Concreteiro',
//             obra: 'Condominio Sergipe',
//         },
//         {
//             id: 3,
//             nome: 'José Aldo',
//             valor_hora: 50,
//             hora_trabalhada: 44,
//             status: 'ativo',
//             funcao: 'Servente',
//             especialidade: 'Pintor',
//             obra: 'Condominio Bahia',
//         },
//     ],
// });