import { StyleSheet } from "react-native";

const StyleDashboardEngenheiro = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f3f4f6' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12
  },
  cardTitle: { fontSize: 12, color: '#6b7280' },
  cardNumber: { fontSize: 22, fontWeight: '700', marginTop: 6 },
  cardSub: { fontSize: 11, color: '#6b7280' },
  section: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 12
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowLabel: { fontSize: 14 },
  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  obraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb'
  },
  statusDot: { padding: 6, borderRadius: 999, marginRight: 6 },
  obraNome: { fontWeight: '600' },
  obraLocal: { fontSize: 12, color: '#6b7280' },
  percent: { fontSize: 12, fontWeight: '600' },
  progressBg: {
    width: 60,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    marginTop: 2
  },
  progressFill: {
    height: 6,
    backgroundColor: '#2563eb',
    borderRadius: 999
  },
  financeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  financeCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  financeLabel: { fontSize: 13, fontWeight: '600' },
  financeValue: { fontSize: 18, fontWeight: '700', marginTop: 4 }
});

export default StyleDashboardEngenheiro;