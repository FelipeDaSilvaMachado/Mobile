import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyleDashboardEngenheiro from './StyleDashboardEngenheiro';

export default function DashboardEngenheiro(props) {
  const { obras, produtos, maoObra, maquinario, materialUtilizado } = props
 
  const obrasAtivas = obras.filter(o => o.status === 'ativa').length
  const obrasEmAndamento = obras.filter(o => o.status === 'em-andamento').length
  const obrasFinalizadas = obras.filter(o => o.status === 'finalizada').length
  const obrasParadas = obras.filter(o => o.status === 'parada').length
 
  const valorTotalObras = obras.reduce((t, o) => t + o.valorTotal, 0)
  const gastoTotal = obras.reduce((t, o) => t + (o.valorTotal * o.percentualGasto / 100), 0)
  const percentualMedioGasto =
    obras.length > 0
      ? obras.reduce((t, o) => t + o.percentualGasto, 0) / obras.length
      : 0
 
  const statusConfig = {
    ativa: { icon: 'checkmark-circle', color: '#22c55e', bg: '#dcfce7' },
    'em-andamento': { icon: 'time', color: '#3b82f6', bg: '#dbeafe' },
    finalizada: { icon: 'checkmark-circle', color: '#6b7280', bg: '#f3f4f6' },
    parada: { icon: 'pause', color: '#ef4444', bg: '#fee2e2' }
  }
 
  return (
    <ScrollView style={StyleDashboardEngenheiro.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* GRID SUPERIOR */}
      <View style={StyleDashboardEngenheiro.grid}>
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Total de Obras</Text>
          <Ionicons name="business" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>{obras.length}</Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>+2 desde o último mês</Text>
        </View>
 
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Produtos</Text>
          <Ionicons name="cube-outline" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>{produtos.length}</Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>Produtos cadastrados</Text>
        </View>
 
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Funcionários</Text>
          <Ionicons name="people" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>
            {maoObra.filter(f => f.status === 'ativo').length}
          </Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>Ativos</Text>
        </View>
 
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Maquinário</Text>
          <Ionicons name="car" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>
            {maquinario.filter(m => m.status === 'locado').length}
          </Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>Locados</Text>
        </View>
 
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Material</Text>
          <Ionicons name="hammer" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>{materialUtilizado.length}</Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>Utilizações</Text>
        </View>
 
        <View style={StyleDashboardEngenheiro.card}>
          <Text style={StyleDashboardEngenheiro.cardTitle}>Gasto Médio</Text>
          <Ionicons name="trending-up" size={20} color="#6b7280" />
          <Text style={StyleDashboardEngenheiro.cardNumber}>{percentualMedioGasto.toFixed(1)}%</Text>
          <Text style={StyleDashboardEngenheiro.cardSub}>Percentual médio</Text>
        </View>
      </View>
 
      {/* STATUS DAS OBRAS */}
      <View style={StyleDashboardEngenheiro.section}>
        <Text style={StyleDashboardEngenheiro.sectionTitle}>Status das Obras</Text>
 
        {[
          { label: 'Ativas', value: obrasAtivas, icon: 'checkmark-circle', color: '#22c55e' },
          { label: 'Em andamento', value: obrasEmAndamento, icon: 'time', color: '#3b82f6' },
          { label: 'Finalizadas', value: obrasFinalizadas, icon: 'checkmark-circle', color: '#6b7280' },
          { label: 'Paradas', value: obrasParadas, icon: 'pause', color: '#ef4444' }
        ].map((item, i) => (
          <View key={i} style={StyleDashboardEngenheiro.rowBetween}>
            <View style={StyleDashboardEngenheiro.row}>
              <Ionicons name={item.icon} size={16} color={item.color} />
              <Text style={StyleDashboardEngenheiro.rowLabel}>{item.label}</Text>
            </View>
            <View style={StyleDashboardEngenheiro.badge}>
              <Text style={StyleDashboardEngenheiro.badgeText}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
 
      {/* OBRAS RECENTES */}
      <View style={StyleDashboardEngenheiro.section}>
        <Text style={StyleDashboardEngenheiro.sectionTitle}>Obras Recentes</Text>
 
        {obras.slice(0, 4).map(obra => {
          const cfg = statusConfig[obra.status] || statusConfig['em-andamento']
 
          return (
            <View key={obra.id} style={StyleDashboardEngenheiro.obraRow}>
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
          )
        })}
      </View>
 
      {/* RESUMO FINANCEIRO */}
      <View style={StyleDashboardEngenheiro.section}>
        <Text style={StyleDashboardEngenheiro.sectionTitle}>Resumo Financeiro</Text>
 
        <View style={StyleDashboardEngenheiro.financeGrid}>
          <View style={[StyleDashboardEngenheiro.financeCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={StyleDashboardEngenheiro.financeLabel}>Valor Orçado</Text>
            <Text style={StyleDashboardEngenheiro.financeValue}>
              R$ {valorTotalObras.toLocaleString('pt-BR')}
            </Text>
          </View>
 
          <View style={[StyleDashboardEngenheiro.financeCard, { backgroundColor: '#ffedd5' }]}>
            <Text style={StyleDashboardEngenheiro.financeLabel}>Gasto em Obras</Text>
            <Text style={StyleDashboardEngenheiro.financeValue}>
              R$ {gastoTotal.toLocaleString('pt-BR')}
            </Text>
          </View>
 
          <View style={[StyleDashboardEngenheiro.financeCard, { backgroundColor: '#dcfce7' }]}>
            <Text style={StyleDashboardEngenheiro.financeLabel}>Saldo Disponível</Text>
            <Text style={StyleDashboardEngenheiro.financeValue}>
              R$ {(valorTotalObras - gastoTotal).toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>
 
    </ScrollView>
  );
};