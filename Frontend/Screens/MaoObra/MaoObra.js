import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import AppCard from '../Componentes/AppCard';
import StylesMaoObra from './StylesMaoObra';
import { ServicoMaoObra } from './ServicoMaoObra';

export default function MaoObra({ navigation }) {
    const [dashboardData, setDashboardData] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('todos');
    const [carregando, setCarregando] = useState(true);
    const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);

    useEffect(() => {
        carregarDashboard();
    }, []);

    const carregarDashboard = async () => {
        try {
            setCarregando(true);
            const data = await ServicoMaoObra.fetchDashboardData();
            setDashboardData(data);
            setFuncionarios(data.funcionarios || []);
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
            const mockData = ServicoMaoObra.getMockDataDashboard();
            setDashboardData(mockData);
            setFuncionarios(mockData.funcionarios);
        } finally {
            setCarregando(false);
        }
    };

    const buscarFuncionarios = async () => {
        try {
            setCarregando(true);
            const resultados = await ServicoMaoObra.fetchFuncionariosList(busca);
            setFuncionarios(resultados);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setCarregando(false);
        }
    };

    const filtrarPorStatus = (status) => {
        setStatusFiltro(status);
        if (!dashboardData) return;

        if (status === 'todos') {
            setFuncionarios(dashboardData.funcionarios || []);
        } else {
            const filtrados = dashboardData.funcionarios.filter(f =>
                f.status.toLowerCase() === status.toLowerCase()
            );
            setFuncionarios(filtrados);
        }
    };

    const toggleSelecaoFuncionario = (id) => {
        setFuncionariosSelecionados(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Componente para cada item da lista (usando AppCard)
    const ItemFuncionario = ({ item }) => (
        <AppCard style={StylesMaoObra.cardFuncionario}>
            <View style={StylesMaoObra.cardHeader}>
                <View style={StylesMaoObra.checkboxContainer}>
                    <TouchableOpacity
                        style={[
                            StylesMaoObra.checkbox,
                            funcionariosSelecionados.includes(item.id) && StylesMaoObra.checkboxSelecionado
                        ]}
                        onPress={() => toggleSelecaoFuncionario(item.id)}
                    >
                        {funcionariosSelecionados.includes(item.id) && (
                            <Text style={StylesMaoObra.checkboxIcon}>✓</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={StylesMaoObra.headerInfo}>
                    <Text style={StylesMaoObra.nomeFuncionario}>{item.nome}</Text>
                    <View style={[
                        StylesMaoObra.statusBadge,
                        item.status.toLowerCase() === 'ativo' && StylesMaoObra.statusActive,
                        item.status.toLowerCase() === 'férias' && StylesMaoObra.statusVacation,
                    ]}>
                        <Text style={StylesMaoObra.statusText}>{item.status}</Text>
                    </View>
                </View>
            </View>

            <View style={StylesMaoObra.cardContent}>
                <View style={StylesMaoObra.infoRow}>
                    <View style={StylesMaoObra.infoColumn}>
                        <Text style={StylesMaoObra.infoLabel}>Função:</Text>
                        <Text style={StylesMaoObra.infoValue}>{item.funcao}</Text>
                    </View>
                    <View style={StylesMaoObra.infoColumn}>
                        <Text style={StylesMaoObra.infoLabel}>Especialidade:</Text>
                        <Text style={StylesMaoObra.infoValue}>{item.especialidade}</Text>
                    </View>
                </View>

                <View style={StylesMaoObra.infoRow}>
                    <View style={StylesMaoObra.infoColumn}>
                        <Text style={StylesMaoObra.infoLabel}>Valor/Hora:</Text>
                        <Text style={StylesMaoObra.infoValue}>{item.valor_hora}</Text>
                    </View>
                    <View style={StylesMaoObra.infoColumn}>
                        <Text style={StylesMaoObra.infoLabel}>Horas/Mês:</Text>
                        <Text style={StylesMaoObra.infoValue}>{item.horas_mes}</Text>
                    </View>
                </View>

                {item.obra && (
                    <View style={StylesMaoObra.infoRow}>
                        <View style={StylesMaoObra.infoColumn}>
                            <Text style={StylesMaoObra.infoLabel}>Obra:</Text>
                            <Text style={StylesMaoObra.infoValue}>{item.obra}</Text>
                        </View>
                    </View>
                )}

                <View style={StylesMaoObra.acoesContainer}>
                    <TouchableOpacity style={StylesMaoObra.botaoAcao}>
                        <Text style={StylesMaoObra.botaoAcaoText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[StylesMaoObra.botaoAcao, StylesMaoObra.botaoDetalhes]}>
                        <Text style={StylesMaoObra.botaoDetalhesText}>Ver Detalhes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppCard>
    );

    // Componente para a lista de seleção
    const SelectionList = () => (
        <View style={StylesMaoObra.selectionListContainer}>
            <FlatList
                data={funcionarios}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ItemFuncionario item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={StylesMaoObra.listaContainer}
            />
        </View>
    );

    if (carregando) {
        return (
            <View style={StylesMaoObra.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={StylesMaoObra.container}>
            <Text style={StylesMaoObra.title}>Mão de Obra</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Dashboard Metrics usando AppCard */}
                <View style={StylesMaoObra.metricsGrid}>
                    <AppCard style={StylesMaoObra.metricCard}>
                        <Text style={StylesMaoObra.metricLabel}>Funcionários Ativos</Text>
                        <Text style={StylesMaoObra.metricValue}>
                            {dashboardData?.funcionariosAtivos || 0}
                        </Text>
                    </AppCard>

                    <AppCard style={StylesMaoObra.metricCard}>
                        <Text style={StylesMaoObra.metricLabel}>Total Horas/Mês</Text>
                        <Text style={StylesMaoObra.metricValue}>
                            {dashboardData?.totalHorasMes || '0h'}
                        </Text>
                    </AppCard>

                    <AppCard style={StylesMaoObra.metricCard}>
                        <Text style={StylesMaoObra.metricLabel}>Em Férias</Text>
                        <Text style={StylesMaoObra.metricValue}>
                            {dashboardData?.funcionariosFerias || 0}
                        </Text>
                    </AppCard>

                    <AppCard style={StylesMaoObra.metricCard}>
                        <Text style={StylesMaoObra.metricLabel}>Inativos</Text>
                        <Text style={StylesMaoObra.metricValue}>
                            {dashboardData?.funcionariosInativos || 0}
                        </Text>
                    </AppCard>
                </View>

                {/* Campo de busca */}
                <AppCard style={StylesMaoObra.searchCard}>
                    <TextInput
                        style={StylesMaoObra.searchInput}
                        placeholder="Buscar por nome, função ou documento..."
                        value={busca}
                        onChangeText={setBusca}
                        onSubmitEditing={buscarFuncionarios}
                    />

                    <View style={StylesMaoObra.filtersContainer}>
                        <TouchableOpacity
                            style={[
                                StylesMaoObra.filterButton,
                                statusFiltro === 'todos' && StylesMaoObra.filterButtonActive
                            ]}
                            onPress={() => filtrarPorStatus('todos')}
                        >
                            <Text style={[
                                StylesMaoObra.filterButtonText,
                                statusFiltro === 'todos' && StylesMaoObra.filterButtonTextActive
                            ]}>
                                Todos os status
                            </Text>
                        </TouchableOpacity>

                        {['ativo', 'férias', 'inativo'].map(status => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    StylesMaoObra.filterButton,
                                    statusFiltro === status && StylesMaoObra.filterButtonActive
                                ]}
                                onPress={() => filtrarPorStatus(status)}
                            >
                                <Text style={[
                                    StylesMaoObra.filterButtonText,
                                    statusFiltro === status && StylesMaoObra.filterButtonTextActive
                                ]}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </AppCard>

                {/* Título da lista */}
                <View style={StylesMaoObra.listaHeader}>
                    <Text style={StylesMaoObra.listaTitle}>
                        Lista de Funcionários ({funcionarios.length})
                    </Text>
                </View>

                {/* Lista de funcionários usando SelectionList */}
                <SelectionList />
            </ScrollView>
        </View>
    );
};