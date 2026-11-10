import { ReactNode, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Lembrete, LembreteInput } from '../../types/lembrete';
import { cores } from '../../constants/cores';
import { dataDaApi, dataParaApi, horaValida, maskData, maskHora } from '../../utils/data';

type Props = {
    inicial?: Lembrete;
    children: (enviar: () => void) => ReactNode; // botões da tela (SAVE ou Cancel/OK)
    onSubmit: (dados: LembreteInput) => void;
};

// Formulário comum às telas "Novo Lembrete" e "Editar Lembrete"
export function LembreteForm({ inicial, children, onSubmit }: Props) {
    const [titulo, setTitulo] = useState(inicial?.TituloLembrete ?? '');
    const [nota, setNota] = useState(inicial?.DescricaoLembrete ?? '');
    const [data, setData] = useState(dataDaApi(inicial?.DataLembrete ?? null));
    const [horario, setHorario] = useState(inicial?.HorarioLembrete ?? '');
    const [diario, setDiario] = useState(inicial?.DiarioLembrete ?? false);

    function enviar() {
        if (titulo.trim() === '') {
            Alert.alert('Atenção', 'Preencha o título!');
            return;
        }
        const dataApi = data ? dataParaApi(data) : null;
        if (data && !dataApi) {
            Alert.alert('Atenção', 'Data inválida. Use DD/MM/AAAA.');
            return;
        }
        if (horario && !horaValida(horario)) {
            Alert.alert('Atenção', 'Horário inválido. Use HH:MM.');
            return;
        }
        onSubmit({
            TituloLembrete: titulo.trim(),
            DescricaoLembrete: nota.trim(),
            DataLembrete: dataApi,
            HorarioLembrete: horario || null,
            DiarioLembrete: diario,
            StatusLembrete: inicial?.StatusLembrete ?? false,
        });
    }

    return (
        <View>
            <View style={styles.painel}>
                <Text style={styles.label}>TÍTULO:</Text>
                <TextInput style={styles.linha} value={titulo} onChangeText={setTitulo} maxLength={100} />

                <Text style={[styles.label, { marginTop: 18 }]}>NOTA:</Text>
                <TextInput
                    style={[styles.linha, styles.nota]}
                    value={nota}
                    onChangeText={setNota}
                    multiline
                    textAlignVertical="top"
                />
            </View>

            <View style={[styles.painel, { marginTop: 36 }]}>
                <View style={styles.linhaCampo}>
                    <Text style={styles.label}>DATA:</Text>
                    <TextInput
                        style={[styles.linha, styles.campoCurto]}
                        value={data}
                        onChangeText={t => setData(maskData(t))}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                    />
                    <MaterialCommunityIcons name="calendar-check" size={44} color={cores.texto} />
                </View>

                <View style={[styles.linhaCampo, { marginTop: 14 }]}>
                    <Text style={styles.label}>HORÁRIO:</Text>
                    <TextInput
                        style={[styles.linha, styles.campoCurto]}
                        value={horario}
                        onChangeText={t => setHorario(maskHora(t))}
                        placeholder="HH:MM"
                        placeholderTextColor="#9A9A9A"
                        keyboardType="number-pad"
                    />
                    <MaterialCommunityIcons name="clock-outline" size={44} color={cores.texto} />
                </View>

                <View style={[styles.linhaCampo, { marginTop: 14 }]}>
                    <Text style={styles.label}>DIÁRIO:</Text>
                    <Switch value={diario} onValueChange={setDiario} />
                </View>
            </View>

            {children(enviar)}
        </View>
    );
}

const styles = StyleSheet.create({
    painel: {
        backgroundColor: cores.painel,
        borderRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 24,
    },
    label: { fontSize: 18, fontWeight: '800', color: cores.texto },
    linha: {
        borderBottomWidth: 3,
        borderBottomColor: cores.texto,
        fontSize: 16,
        paddingVertical: 4,
        color: cores.texto,
    },
    nota: { minHeight: 70, borderBottomWidth: 0 },
    linhaCampo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
    campoCurto: { flex: 1 },
});
