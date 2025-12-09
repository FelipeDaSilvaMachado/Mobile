import { StyleSheet } from "react-native";

const StylesHeader = StyleSheet.create({
    container: {
        paddingTop: 48,
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: { fontSize: 18, fontWeight: '700', color: '#111827' },
    subtitle: { fontSize: 12, color: '#6b7280' },
    logoutButton: {
        padding: 8,
        borderRadius: 999,
        backgroundColor: '#fee2e2'
    },
    logoHeader: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 50,
        height: 50,
    },
});

export default StylesHeader;