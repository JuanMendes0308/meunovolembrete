import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../../constants/cores';

type Props = {
    criar?: boolean;      // mostra "+ CRIAR"
    direita?: ReactNode;  // elemento customizado à direita (ex.: lixeira)
};

export function Header({ criar, direita }: Props) {
    const insets = useSafeAreaInsets();

    function voltar() {
        if (router.canGoBack()) router.back();
        else router.replace('/');
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
            <Pressable onPress={voltar} hitSlop={12}>
                <Ionicons name="return-up-back" size={44} color={cores.texto} />
            </Pressable>

            {criar && (
                <Pressable style={styles.criar} onPress={() => router.push('/add')} hitSlop={12}>
                    <Ionicons name="add-circle-outline" size={36} color={cores.texto} />
                    <Text style={styles.criarTexto}>CRIAR</Text>
                </Pressable>
            )}
            {direita}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingBottom: 6,
        borderBottomWidth: 4,
        borderBottomColor: cores.texto,
        backgroundColor: cores.fundo,
    },
    criar: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    criarTexto: { fontSize: 16, fontWeight: '800', color: cores.texto },
});
