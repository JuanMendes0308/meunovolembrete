import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "../../components/header/header";
import { LembreteForm } from "../../components/lembreteForm/lembreteForm";
import { atualizarLembrete, excluirLembrete, getLembretesByIdByAPI } from "../../services/lembrete";
import { Lembrete, LembreteInput } from "../../types/lembrete";
import { cores } from "../../constants/cores";

export default function EditarLembreteScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const idLembrete = parseInt(id as string);
    const [lembrete, setLembrete] = useState<Lembrete>();
    const [erro, setErro] = useState(false);

    useEffect(() => {
        getLembretesByIdByAPI(idLembrete).then(setLembrete).catch(() => setErro(true));
    }, [idLembrete]);

    async function salvar(dados: LembreteInput) {
        try {
            await atualizarLembrete(idLembrete, dados);
            router.back();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o lembrete. " + error);
        }
    }

    function confirmarExclusao() {
        Alert.alert("Excluir", "Deseja excluir este lembrete?", [
            { text: "Não", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        await excluirLembrete(idLembrete);
                        router.back();
                    } catch (error) {
                        Alert.alert("Erro", "Não foi possível excluir o lembrete. " + error);
                    }
                },
            },
        ]);
    }

    const lixeira = (
        <Pressable style={styles.lixeira} onPress={confirmarExclusao} hitSlop={8}>
            <Ionicons name="trash-outline" size={28} color="#fff" />
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Header direita={lixeira} />
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>EDITAR LEMBRETE</Text>

                {!lembrete && !erro && <ActivityIndicator size="large" color={cores.texto} />}
                {erro && <Text style={styles.erro}>Lembrete não encontrado.</Text>}

                {lembrete && (
                    <LembreteForm inicial={lembrete} onSubmit={salvar}>
                        {(enviar) => (
                            <>
                                <Pressable style={[styles.lixeira, styles.lixeiraCentro]} onPress={confirmarExclusao}>
                                    <Ionicons name="trash-outline" size={28} color="#fff" />
                                </Pressable>

                                <View style={styles.botoes}>
                                    <Pressable style={[styles.botao, { backgroundColor: cores.cancelar }]} onPress={() => router.back()}>
                                        <Ionicons name="close" size={26} color="#fff" />
                                        <Text style={styles.botaoTexto}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={[styles.botao, { backgroundColor: cores.ok }]} onPress={enviar}>
                                        <Text style={styles.botaoTexto}>OK</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </LembreteForm>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.fundo },
    conteudo: { padding: 24, paddingBottom: 48 },
    titulo: { fontSize: 28, fontWeight: "800", textAlign: "center", marginVertical: 24, color: cores.texto },
    erro: { textAlign: "center", color: cores.excluir },
    lixeira: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: cores.excluir,
        justifyContent: "center",
        alignItems: "center",
    },
    lixeiraCentro: { alignSelf: "center", marginTop: 24 },
    botoes: { flexDirection: "row", gap: 16, marginTop: 24 },
    botao: {
        flex: 1,
        height: 52,
        borderRadius: 26,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    botaoTexto: { color: "#fff", fontSize: 22, fontWeight: "800" },
});
