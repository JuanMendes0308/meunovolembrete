import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Lembrete } from '../../types/lembrete';
import { cores } from '../../constants/cores';
import { dataDaApi } from '../../utils/data';

type Props = {
    lembrete: Lembrete;
    onToggle?: (lembrete: Lembrete) => void;
};

// Barra azul da "Minha Lista": toque na barra marca como concluído, lápis abre a edição
export function LembreteItem({ lembrete, onToggle }: Props) {
    const quando = [dataDaApi(lembrete.DataLembrete).slice(0, 5), lembrete.HorarioLembrete]
        .filter(Boolean)
        .join(' · ');

    return (
        <View style={styles.contorno}>
            <Pressable style={styles.barra} onPress={() => onToggle?.(lembrete)}>
                <View style={styles.textos}>
                    <Text
                        numberOfLines={1}
                        style={[styles.titulo, lembrete.StatusLembrete && styles.concluido]}
                    >
                        {lembrete.TituloLembrete}
                    </Text>
                    {!!quando && <Text style={styles.quando}>{quando}</Text>}
                </View>

                <Pressable
                    style={styles.lapis}
                    hitSlop={8}
                    onPress={() => router.push(`/lembrete/${lembrete.LembreteId}`)}
                >
                    <Ionicons name="pencil-outline" size={18} color={cores.barra} />
                </Pressable>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    contorno: {
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: cores.contorno,
        borderRadius: 14,
        paddingRight: 3,
        paddingBottom: 3,
    },
    barra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: cores.barra,
        borderRadius: 14,
        minHeight: 52,
        paddingLeft: 16,
        paddingRight: 10,
        paddingVertical: 6,
    },
    textos: { flex: 1, paddingRight: 10 },
    titulo: { fontSize: 17, fontWeight: '700', color: cores.texto },
    concluido: { textDecorationLine: 'line-through', opacity: 0.55 },
    quando: { fontSize: 12, color: '#133A5B' },
    lapis: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: cores.texto,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
