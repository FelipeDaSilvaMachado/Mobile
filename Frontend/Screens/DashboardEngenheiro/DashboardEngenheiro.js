// screens/DashboardEngenheiro.js
import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyleDashboardEngenheiro from './StyleDashboardEngenheiro';
import { UseDashboardData } from './UseDashboardData';

export default function DashboardEngenheiro({ navigation }) {
  const {
    dados,
    loading,
    error,
    estatisticas,
    statusConfig,
    atualizarDados
  } = UseDashboardData();

  const {
    obras,
    produtos,
    maoObra,
    maquinario,
    materialUtilizado,
  } = dados;

  const {
    obrasAtivas,
    obrasEmAndamento,
    obrasFinalizadas,
    obrasParadas,
    valorTotalObras,
    gastoTotal,
    percentualMedioGasto
  } = estatisticas;

  // Status para exibição
  const statusItems = [
    { label: 'Ativas', value: obrasAtivas, icon: 'checkmark-circle', color: '#22c55e' },
    { label: 'Em andamento', value: obrasEmAndamento, icon: 'time', color: '#3b82f6' },
    { label: 'Finalizadas', value: obrasFinalizadas, icon: 'checkmark-done-circle', color: '#6b7280' },
    { label: 'Paradas', value: obrasParadas, icon: 'pause-circle', color: '#ef4444' }
  ];

  return (
    <ScrollView
      style={StyleDashboardEngenheiro.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={atualizarDados}
          colors={['#3b82f6']}
          tintColor="#3b82f6"
        />
      }
    >
      {/* Mensagem de erro */}
      {error && (
        <View style={StyleDashboardEngenheiro.errorContainer}>
          <Ionicons name="warning" size={24} color="#ef4444" />
          <Text style={StyleDashboardEngenheiro.errorText}>{error}</Text>
        </View>
      )}

      {/* GRID SUPERIOR */}
      <View style={StyleDashboardEngenheiro.grid}>
        <CardDashboard
          title="Total de Obras"
          icon="business"
          value={obras.length}
          subtitle="+2 desde o último mês"
        />

        <CardDashboard
          title="Produtos"
          icon="cube-outline"
          value={produtos.length}
          subtitle="Produtos cadastrados"
        />

        <CardDashboard
          title="Funcionários"
          icon="people"
          value={maoObra.filter(f => f.status === 'ativo').length}
          subtitle="Ativos"
        />

        <CardDashboard
          title="Maquinário"
          icon="car"
          value={maquinario.filter(m => m.status === 'locado').length}
          subtitle="Locados"
        />

        <CardDashboard
          title="Material"
          icon="hammer"
          value={materialUtilizado.length}
          subtitle="Utilizações"
        />

        <CardDashboard
          title="Gasto Médio"
          icon="trending-up"
          value={`${percentualMedioGasto.toFixed(1)}%`}
          subtitle="Percentual médio"
        />
      </View>

      {/* STATUS DAS OBRAS */}
      <Section title="Status das Obras">
        {statusItems.map((item, i) => (
          <StatusRow
            key={i}
            icon={item.icon}
            label={item.label}
            value={item.value}
            color={item.color}
          />
        ))}
      </Section>

      {/* OBRAS RECENTES */}
      <Section title="Obras Recentes">
        {obras.slice(0, 4).map(obra => (
          <ObraRow
            key={obra.id}
            obra={obra}
            statusConfig={statusConfig}
          />
        ))}
      </Section>

      {/* RESUMO FINANCEIRO */}
      <Section title="Resumo Financeiro">
        <View style={StyleDashboardEngenheiro.financeGrid}>
          <FinanceCard
            label="Valor Orçado"
            value={`R$ ${valorTotalObras.toLocaleString('pt-BR')}`}
            backgroundColor="#dbeafe"
          />

          <FinanceCard
            label="Gasto em Obras"
            value={`R$ ${gastoTotal.toLocaleString('pt-BR')}`}
            backgroundColor="#ffedd5"
          />

          <FinanceCard
            label="Saldo Disponível"
            value={`R$ ${(valorTotalObras - gastoTotal).toLocaleString('pt-BR')}`}
            backgroundColor="#dcfce7"
          />
        </View>
      </Section>
    </ScrollView>
  );
}

// Componentes auxiliares (pode colocar em arquivo separado)
const CardDashboard = ({ title, icon, value, subtitle }) => (
  <View style={StyleDashboardEngenheiro.card}>
    <Text style={StyleDashboardEngenheiro.cardTitle}>{title}</Text>
    <Ionicons name={icon} size={20} color="#6b7280" />
    <Text style={StyleDashboardEngenheiro.cardNumber}>{value}</Text>
    <Text style={StyleDashboardEngenheiro.cardSub}>{subtitle}</Text>
  </View>
);

const Section = ({ title, children }) => (
  <View style={StyleDashboardEngenheiro.section}>
    <Text style={StyleDashboardEngenheiro.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const StatusRow = ({ icon, label, value, color }) => (
  <View style={StyleDashboardEngenheiro.rowBetween}>
    <View style={StyleDashboardEngenheiro.row}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={StyleDashboardEngenheiro.rowLabel}>{label}</Text>
    </View>
    <View style={StyleDashboardEngenheiro.badge}>
      <Text style={StyleDashboardEngenheiro.badgeText}>{value}</Text>
    </View>
  </View>
);

const ObraRow = ({ obra, statusConfig }) => {
  const cfg = statusConfig[obra.status] || statusConfig['em-andamento'];

  return (
    <View style={StyleDashboardEngenheiro.obraRow}>
      <View style={StyleDashboardEngenheiro.row}>
        <View style={[StyleDashboardEngenheiro.statusDot, { backgroundColor: cfg.bg }]}>
          <Ionicons name={cfg.icon} size={12} color={cfg.color} />
        </View>
        <View>
          <Text style={StyleDashboardEngenheiro.obraNome}>{obra.nome}</Text>
          <Text style={StyleDashboardEngenheiro.obraLocal}>{obra.local}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={StyleDashboardEngenheiro.percent}>{obra.percentualGasto}%</Text>
        <View style={StyleDashboardEngenheiro.progressBg}>
          <View style={[StyleDashboardEngenheiro.progressFill, { width: `${obra.percentualGasto}%` }]} />
        </View>
      </View>
    </View>
  );
};

const FinanceCard = ({ label, value, backgroundColor }) => (
  <View style={[StyleDashboardEngenheiro.financeCard, { backgroundColor }]}>
    <Text style={StyleDashboardEngenheiro.financeLabel}>{label}</Text>
    <Text style={StyleDashboardEngenheiro.financeValue}>{value}</Text>
  </View>
);