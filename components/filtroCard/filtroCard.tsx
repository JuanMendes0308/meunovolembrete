import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../../constants/cores';

type Props = {
    titulo: string;
    imagem: ImageSourcePropType;
    ativo?: boolean;
    onPress: () => void;
};

export function FiltroCard({ titulo, imagem, ativo, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.card, ativo && styles.ativo]}
        >
            <Image source={imagem} style={styles.imagem} resizeMode="contain" />
            <Text style={styles.titulo}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 130,
        backgroundColor: cores.card,
        borderRadius: 16,
        padding: 12,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DDD',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    ativo: { borderColor: cores.texto, borderWidth: 2 },
    imagem: { width: 70, height: 70 },
    titulo: { fontSize: 15, fontWeight: '800', color: cores.texto },
});
