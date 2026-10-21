import {Lembrete} from '../../types/lembrete';
import {Text, Pressable, Switch} from 'react-native';
import { Link } from 'expo-router';
import {StyleSheet} from 'react-native';

type Props = {
    lembrete: Lembrete
}

export function LembreteItem({lembrete}:Props) {
    return (
        <Link href={`/lembrete/${lembrete.lembreteId}`} asChild >
        <Pressable style={styles.container}>
                <Text style={styles.lembreteTitle}>{lembrete.tituloLembrete}</Text>
                <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} value={lembrete.statusLembrete} />
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    lembreteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});
