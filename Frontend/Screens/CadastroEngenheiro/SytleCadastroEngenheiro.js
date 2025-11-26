import { StyleSheet } from "react-native";

const StylesCadastroEngenheiro = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF0FA",
        padding: 18,
    },
    voltar: {
        color: "#333",
        fontSize: 14,
    },
    header: {
        alignItems: "center",
        marginBottom: 14,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#001F3F",
        textAlign: "center",
        marginTop: 8,
    },
    subtitulo: {
        color: "#555",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#001F3F",
    },
    cardSubtitulo: {
        textAlign: "center",
        color: "#555",
        marginBottom: 8,
    },
    abas: {
        flexDirection: "row",
        backgroundColor: "#F0F2F7",
        borderRadius: 30,
        marginVertical: 10,
    },
    aba: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 30,
        alignItems: "center",
    },
    abaAtiva: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    abaTexto: {
        color: "#555",
        fontWeight: "500",
    },
    abaTextoAtivo: {
        color: "#001F3F",
        fontWeight: "bold",
    },
    label: {
        color: "#333",
        fontWeight: "600",
        marginTop: 8,
    },
    input: {
        backgroundColor: "#F8F9FC",
        borderRadius: 10,
        padding: 12,
        marginTop: 6,
    },
    senhaContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    botao: {
        backgroundColor: "#001F3F",
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    botaoTexto: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 8,
    },
    credenciaisBox: {
        marginTop: 14,
        backgroundColor: "#F8F9FC",
        padding: 10,
        borderRadius: 10,
    },
    credTitulo: {
        color: "#333",
        fontWeight: "bold",
        marginBottom: 8,
    },
    credRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    tag: {
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    tagTexto: {
        fontWeight: "600",
        color: "#333",
        fontSize: 12,
    },
    credTexto: {
        color: "#555",
    },
    userTypeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    userTypeButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAF0FA",
        borderRadius: 8,
        paddingVertical: 10,
        marginHorizontal: 6,
    },
    userTypeAtivo: {
        backgroundColor: "#001F3F",
    },
    userTypeTexto: {
        fontWeight: "600",
        marginLeft: 8,
        color: "#333",
    },
    infoText: {
        fontSize: 13,
        color: "#555",
        marginTop: 12,
        textAlign: "left",
    },
});

export default StylesCadastroEngenheiro;