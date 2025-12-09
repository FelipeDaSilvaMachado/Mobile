import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import StylesHome from './StylesHome'

export default function Home({ navigation }) {
  return (
    <ScrollView style={StylesHome.container}>
      {/* HEADER */}
      <View style={StylesHome.header}>
        <View style={StylesHome.logoRow}>
          <Ionicons name="business" size={28} color="#2563eb" />
          <Text style={StylesHome.logoText}>Daily Inspection</Text>
        </View>

        <View style={StylesHome.headerButtons}>
          <TouchableOpacity style={StylesHome.outlineButton}>
            <Ionicons name="mail-outline" size={18} color="#2563eb" />
            <Text style={StylesHome.outlineButtonText}>Contato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={StylesHome.primaryButton} onPress={'Login'}>
            <Ionicons name="shield-checkmark" size={18} color="#fff" />
            <Text style={StylesHome.primaryButtonText}>Acessar Sistema</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO */}
      <View style={StylesHome.hero}>
        <Text style={StylesHome.heroTitle}>
          Sistema Completo de
          <Text style={StylesHome.heroTitleBlue}> Controle de Obras</Text>
        </Text>
        <Text style={StylesHome.heroSubtitle}>
          Gerencie suas obras, custos e equipes em um só lugar, com visão clara do progresso e dos gastos.
        </Text>

        <View style={StylesHome.heroButtons}>
          <TouchableOpacity
            style={StylesHome.primaryButton}
            onPress={() => navigation.navigate('Login')
            }
          >
            <Ionicons name="arrow-forward" size={20} color="#fff" />
            <Text style={StylesHome.primaryButtonText}>Começar Agora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={StylesHome.outlineButton}>
            <Ionicons name="mail-outline" size={18} color="#2563eb" />
            <Text style={StylesHome.outlineButtonText}>Solicitar Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FEATURES */}
      <View style={StylesHome.section}>
        <Text style={StylesHome.sectionTitle}>Recursos Principais</Text>
        <View style={StylesHome.cardGrid}>
          <FeatureCard
            icon="business"
            title="Gestão de Obras"
            text="Acompanhe status, prazos, responsáveis e progresso em tempo real."
          />
          <FeatureCard
            icon="bar-chart"
            title="Controle Financeiro"
            text="Compare orçamento x gasto e identifique desvios rapidamente."
          />
          <FeatureCard
            icon="people"
            title="Gestão de Equipes"
            text="Visualize alocação de mão de obra e maquinário por obra."
          />
        </View>
      </View>

      {/* PRICING SIMPLES */}
      <View style={StylesHome.section}>
        <Text style={StylesHome.sectionTitle}>Planos e Preços</Text>
        <View style={StylesHome.pricingRow}>
          <PriceCard
            title="Mensal"
            price="R$ 599,90/mês"
            subtitle="Ideal para começar"
          />
          <PriceCard
            title="Anual"
            price="R$ 499,90/mês"
            subtitle="Melhor custo-benefício"
            highlight
          />
        </View>
        <Text style={StylesHome.pricingNote}>
          Todos os planos incluem 7 dias de teste gratuito. Cancele a qualquer momento.
        </Text>
      </View>

      {/* FOOTER SIMPLES */}
      <View style={StylesHome.footer}>
        <Text style={StylesHome.footerText}>© 2024 Daily Inspection. Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  )
}

function FeatureCard({ icon, title, text }) {
  return (
    <View style={StylesHome.card}>
      <Ionicons name={icon} size={32} color="#2563eb" style={{ marginBottom: 8 }} />
      <Text style={StylesHome.cardTitle}>{title}</Text>
      <Text style={StylesHome.cardText}>{text}</Text>
    </View>
  )
}

function PriceCard({ title, price, subtitle, highlight }) {
  return (
    <View style={[StylesHome.priceCard, highlight && StylesHome.priceCardHighlight]}>
      {highlight && (
        <View style={StylesHome.badge}>
          <Ionicons name="star" size={14} color="#fff" />
          <Text style={StylesHome.badgeText}>MAIS POPULAR</Text>
        </View>
      )}
      <Text style={StylesHome.priceTitle}>{title}</Text>
      <Text style={StylesHome.priceValue}>{price}</Text>
      <Text style={StylesHome.priceSubtitle}>{subtitle}</Text>
    </View>
  )
}