import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Header } from "../components/header/header";
import { LembreteForm } from "../components/lembreteForm/lembreteForm";
import { criarLembrete } from "../services/lembrete";
import { LembreteInput } from "../types/lembrete";
import { cores } from "../constants/cores";

export default function AddScreen() {
    async function salvar(dados: LembreteInput) {
        try {
            await criarLembrete(dados);
            router.replace("/list");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar o lembrete. " + error);
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>NOVO LEMBRETE</Text>
                <LembreteForm onSubmit={salvar}>
                    {(enviar) => (
                        <Pressable style={styles.salvar} onPress={enviar}>
                            <Text style={styles.salvarTexto}>SAVE</Text>
                        </Pressable>
                    )}
                </LembreteForm>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.fundo },
    conteudo: { padding: 24, paddingBottom: 48 },
    titulo: { fontSize: 28, fontWeight: "800", textAlign: "center", marginVertical: 24, color: cores.texto },
    salvar: {
        alignSelf: "center",
        marginTop: 48,
        backgroundColor: cores.salvar,
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 70,
        borderWidth: 3,
        borderColor: "#fff",
        elevation: 3,
    },
    salvarTexto: { color: "#fff", fontSize: 22, fontWeight: "800" },
});
