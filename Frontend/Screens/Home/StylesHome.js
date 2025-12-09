import { StyleSheet } from "react-native";

const StylesHome = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#eef2ff' },
    header: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoRow: { flexDirection: 'row', alignItems: 'center' },
    logoText: { marginLeft: 8, fontSize: 20, fontWeight: '700', color: '#111827' },
    headerButtons: { flexDirection: 'row', alignItems: 'center' },
    primaryButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    primaryButtonText: { color: '#fff', fontWeight: '600' },
    outlineButton: {
        borderWidth: 1,
        borderColor: '#2563eb',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center'
    },
    outlineButtonText: { color: '#2563eb', fontWeight: '500' },
    hero: { padding: 24, alignItems: 'center' },
    heroTitle: { fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#111827' },
    heroTitleBlue: { color: '#2563eb' },
    heroSubtitle: {
        marginTop: 12,
        fontSize: 15,
        color: '#4b5563',
        textAlign: 'center'
    },
    heroButtons: { flexDirection: 'row', marginTop: 20 },
    section: { paddingHorizontal: 24, paddingVertical: 16 },
    sectionTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        alignItems: 'center'
    },
    cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
    cardText: { fontSize: 13, color: '#4b5563', textAlign: 'center' },
    pricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        position: 'relative'
    },
    priceCardHighlight: {
        borderWidth: 2,
        borderColor: '#2563eb'
    },
    badge: {
        position: 'absolute',
        top: -10,
        alignSelf: 'center',
        backgroundColor: '#2563eb',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '700', marginLeft: 4 },
    priceTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
    priceValue: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginVertical: 4 },
    priceSubtitle: { fontSize: 13, textAlign: 'center', color: '#4b5563' },
    pricingNote: {
        marginTop: 8,
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center'
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        alignItems: 'center'
    },
    footerText: { fontSize: 12, color: '#6b7280' }
});

export default StylesHome;