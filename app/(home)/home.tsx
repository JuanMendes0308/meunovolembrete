import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Header } from "../../components/header/header";
import { FiltroCard } from "../../components/filtroCard/filtroCard";
import { LembreteItem } from "../../components/lembreteItem/lembreteItem";
import { useLembretes } from "../../hooks/useLembretes";
import { cores } from "../../constants/cores";
import { Filtro } from "../../types/lembrete";

export default function HomeScreen() {
    const { lembretes, loading, erro, alternarStatus } = useLembretes();

    function abrir(filtro: Filtro) {
        router.navigate({ pathname: "/list", params: { filtro } });
    }

    return (
        <View style={styles.container}>
            <Header criar />
            <ScrollView contentContainerStyle={styles.conteudo}>
                <Text style={styles.titulo}>Seus Lembretes</Text>

                <View style={styles.linhaCards}>
                    <FiltroCard titulo="HOJE" imagem={require("../../assets/icon-hoje.png")} onPress={() => abrir("hoje")} />
                    <FiltroCard titulo="PROGRAMADOS" imagem={require("../../assets/icon-programados.png")} onPress={() => abrir("programados")} />
                </View>
                <View style={styles.linhaCards}>
                    <FiltroCard titulo="TODOS" imagem={require("../../assets/icon-todos.png")} onPress={() => abrir("todos")} />
                    <FiltroCard titulo="DIÁRIOS" imagem={require("../../assets/icon-diarios.png")} onPress={() => abrir("diarios")} />
                </View>

                <Text style={[styles.titulo, { marginTop: 24 }]}>Minha Lista</Text>

                {loading && <ActivityIndicator size="large" color={cores.texto} />}
                {!!erro && <Text style={styles.erro}>{erro}</Text>}
                {!loading && !erro && lembretes.length === 0 && (
                    <Text style={styles.vazio}>Nenhum lembrete ainda. Toque em CRIAR!</Text>
                )}

                <View style={styles.lista}>
                    {lembretes.slice(0, 4).map(l => (
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
