import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { ServicoDashboard } from './ServicoDashboard';

export const UseDashboardData = () => {
    const [dados, setDados] = useState({
        obras: [],
        produtos: [],
        maoObra: [],
        maquinario: [],
        materialUtilizado: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const calcularEstatisticas = (dados) => {
        const { obras } = dados;

        const obrasAtivas = obras.filter(o => o.status === 'ativa').length;
        const obrasEmAndamento = obras.filter(o => o.status === 'em-andamento').length;
        const obrasFinalizadas = obras.filter(o => o.status === 'finalizada').length;
        const obrasParadas = obras.filter(o => o.status === 'parada').length;

        const valorTotalObras = obras.reduce((t, o) => t + (o.valorTotal || 0), 0);
        const gastoTotal = obras.reduce((t, o) => t + ((o.valorTotal || 0) * (o.percentualGasto || 0) / 100), 0);
        const percentualMedioGasto = obras.length > 0
            ? obras.reduce((t, o) => t + (o.percentualGasto || 0), 0) / obras.length
            : 0;

        return {
            obrasAtivas,
            obrasEmAndamento,
            obrasFinalizadas,
            obrasParadas,
            valorTotalObras,
            gastoTotal,
            percentualMedioGasto
        };
    };

    const statusConfig = {
        ativa: { icon: 'checkmark-circle', color: '#22c55e', bg: '#dcfce7' },
        'em-andamento': { icon: 'time', color: '#3b82f6', bg: '#dbeafe' },
        finalizada: { icon: 'checkmark-done-circle', color: '#6b7280', bg: '#f3f4f6' },
        parada: { icon: 'pause-circle', color: '#ef4444', bg: '#fee2e2' }
    };

    const buscarDados = async () => {
        try {
            setLoading(true);
            setError(null);

            const dadosAPI = await ServicoDashboard.fetchDashboardDataSingle();
            setDados(dadosAPI);

        } catch (err) {
            console.error('Erro ao carregar dashboard:', err);
            setError('Não foi possível carregar os dados');

            // Usar dados mock em caso de erro
            const dadosMock = ServicoDashboard.getMockData();
            setDados(dadosMock);

            Alert.alert(
                'Atenção',
                'Dados demonstrativos (modo offline). Conecte-se à internet para dados reais.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    const atualizarDados = () => {
        buscarDados();
    };

    useEffect(() => {
        buscarDados();
    }, []);

    const estatisticas = calcularEstatisticas(dados);

    return {
        dados,
        loading,
        error,
        estatisticas,
        statusConfig,
        atualizarDados
    };
};