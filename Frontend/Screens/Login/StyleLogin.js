import { StyleSheet } from "react-native";

const StyleLogin = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 4
  },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 16 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    padding: 2,
    marginBottom: 16
  },
  tab: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: 'center'
  },
  tabActive: { backgroundColor: '#2563eb' },
  tabText: { fontSize: 13, color: '#4b5563' },
  tabTextActive: { color: '#ffffff', fontWeight: '600' },
  label: { fontSize: 13, color: '#4b5563', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 4
  },
  buttonText: { 
    color: '#ffffff',
    fontWeight: '600'
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
});

export default StyleLogin;