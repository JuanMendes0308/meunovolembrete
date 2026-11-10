import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "../../components/header/header";
import { FiltroCard } from "../../components/filtroCard/filtroCard";
import { LembreteItem } from "../../components/lembreteItem/lembreteItem";
import { useLembretes } from "../../hooks/useLembretes";
import { filtrar } from "../../utils/data";
import { cores } from "../../constants/cores";
import { Filtro } from "../../types/lembrete";

export default function ListScreen() {
    const { filtro } = useLocalSearchParams<{ filtro?: Filtro }>();
    const ativo = filtro && filtro !== "todos" ? filtro : null;
    const { lembretes, loading, erro, alternarStatus } = useLembretes();

    // Tocar no card ativo remove o filtro
    function alternar(f: Filtro) {
        router.setParams({ filtro: ativo === f ? "todos" : f });
    }

    const lista = filtrar(lembretes, ativo);

    return (
        <View style={styles.container}>
            <Header criar />
            <ScrollView contentContainerStyle={styles.conteudo}>
                <Text style={styles.titulo}>Minha Lista</Text>

                <View style={styles.linhaCards}>
                    <FiltroCard titulo="HOJE" ativo={ativo === "hoje"} imagem={require("../../assets/icon-hoje.png")} onPress={() => alternar("hoje")} />
                    <FiltroCard titulo="PROGRAMADOS" ativo={ativo === "programados"} imagem={require("../../assets/icon-programados.png")} onPress={() => alternar("programados")} />
                </View>
                <View style={styles.linhaCards}>
                    <FiltroCard titulo="TODOS" ativo={!ativo} imagem={require("../../assets/icon-todos.png")} onPress={() => router.setParams({ filtro: "todos" })} />
                    <FiltroCard titulo="DIÁRIOS" ativo={ativo === "diarios"} imagem={require("../../assets/icon-diarios.png")} onPress={() => alternar("diarios")} />
                </View>

                {loading && <ActivityIndicator size="large" color={cores.texto} />}
                {!!erro && <Text style={styles.erro}>{erro}</Text>}
                {!loading && !erro && lista.length === 0 && (
                    <Text style={styles.vazio}>Nenhum lembrete aqui.</Text>
                )}

                <View style={styles.lista}>
                    {lista.map(l => (
                        <LembreteItem key={l.LembreteId} lembrete={l} onToggle={alternarStatus} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.fundo },
    conteudo: { padding: 24, paddingBottom: 16, gap: 18 },
    titulo: { fontSize: 36, fontWeight: "800", textAlign: "center", color: cores.texto },
    linhaCards: { flexDirection: "row", gap: 28 },
    lista: { gap: 16 },
    erro: { textAlign: "center", color: cores.excluir },
    vazio: { textAlign: "center", color: "#666" },
});
