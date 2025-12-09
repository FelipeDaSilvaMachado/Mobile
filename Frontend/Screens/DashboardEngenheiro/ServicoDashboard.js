import ApiConfig from '../../../Backend/Database/ApiConfig';
import { auth } from '../../../Backend/Firebase/Firebase';

export const ServicoDashboard = {
    fetchDashboardData: async () => {
        try {
            const { currentUser } = auth();
            if (!currentUser) {
                throw new Error('Usuário não autenticado');
            }

            const token = await currentUser.getIdToken();

            const [
                obrasResponse,
                produtosResponse,
                maoObraResponse,
                maquinarioResponse,
                materialResponse
            ] = await Promise.all([
                ApiConfig.get('/obras', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                ApiConfig.get('/produtos', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                ApiConfig.get('/mao-obra', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                ApiConfig.get('/maquinario', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                ApiConfig.get('/material-utilizado', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            return {
                obras: obrasResponse.data || [],
                produtos: produtosResponse.data || [],
                maoObra: maoObraResponse.data || [],
                maquinario: maquinarioResponse.data || [],
                materialUtilizado: materialResponse.data || []
            };

        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            throw error;
        }
    },

    // Ou buscar tudo em um único endpoint (recomendado)
    fetchDashboardDataSingle: async () => {
        try {
            const { currentUser } = auth();
            if (!currentUser) {
                throw new Error('Usuário não autenticado');
            }

            const token = await currentUser.getIdToken();

            let response;

            if (currentUser === 'engenheiro') {
                response = await ApiConfig.get('/dashboard/engenheiro', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else if (currentUser === 'sindico') {
                response = await ApiConfig.get('/dashboard/sindico', {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            // Retornar dados mock para desenvolvimento
            return getMockData();
        }
    }
};

// Dados mock para desenvolvimento/teste
const getMockData = () => ({
    obras: [
        { id: 1, nome: 'Condomínio Solar', local: 'São Paulo', status: 'ativa', valorTotal: 1500000, percentualGasto: 45 },
        { id: 2, nome: 'Edifício Horizonte', local: 'Rio de Janeiro', status: 'em-andamento', valorTotal: 2800000, percentualGasto: 30 },
        { id: 3, nome: 'Residencial Primavera', local: 'Belo Horizonte', status: 'finalizada', valorTotal: 850000, percentualGasto: 100 },
        { id: 4, nome: 'Shopping Center Norte', local: 'Curitiba', status: 'parada', valorTotal: 5000000, percentualGasto: 15 },
        { id: 5, nome: 'Hospital Municipal', local: 'Porto Alegre', status: 'ativa', valorTotal: 3200000, percentualGasto: 60 }
    ],
    produtos: [
        { id: 1, nome: 'Cimento CP II', quantidade: 500, unidade: 'sacos' },
        { id: 2, nome: 'Tijolo Baiano', quantidade: 10000, unidade: 'un' },
        { id: 3, nome: 'Areia Média', quantidade: 200, unidade: 'm³' }
    ],
    maoObra: [
        { id: 1, nome: 'João Silva', funcao: 'Pedreiro', status: 'ativo' },
        { id: 2, nome: 'Maria Santos', funcao: 'Encarregada', status: 'ativo' },
        { id: 3, nome: 'Carlos Oliveira', funcao: 'Servente', status: 'inativo' }
    ],
    maquinario: [
        { id: 1, nome: 'Retroescavadeira', modelo: 'CAT 320', status: 'locado' },
        { id: 2, nome: 'Betoneira', modelo: '500L', status: 'disponivel' },
        { id: 3, nome: 'Guindaste', modelo: 'Terex 250', status: 'locado' }
    ],
    materialUtilizado: [
        { id: 1, obraId: 1, material: 'Cimento', quantidade: 50, data: '2024-01-15' },
        { id: 2, obraId: 2, material: 'Tijolo', quantidade: 2000, data: '2024-01-16' }
    ]
});