import { StyleSheet, Text, SafeAreaView, View, TextInput, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/button/button'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Lembrete } from '../../types/lembrete';
import { getLembreteById } from '../../services/lembrete'
 
export default function LembreteEditScreen() {
 
// AQUI o código que lê o parâmetro id e atualiza a tela através dos hooks
const { id} = useLocalSearchParams();
const idLembrete = parseInt(id as string);
const [lembrete,setLembrete] = useState<Lembrete>();
const [titulo, setTitulo] = useState<string>('');
const [corpo, setCorpo] = useState<string>('');
const [status, setStatus] = useState<boolean>(false);

useEffect(() => {
    if (idLembrete){
    const dadosLembrete = getLembreteById(idLembrete);
    setLembrete(dadosLembrete);    
}}, [idLembrete]);

useEffect(() => {
    if (lembrete) {
        setTitulo(lembrete.tituloLembrete || '');
        setCorpo(lembrete.corpoLembrete || '');
        setStatus(lembrete.statusLembrete || false);
    }
}, [lembrete]);
 
 
return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: lembrete?.tituloLembrete }} />
            <View style={styles.lembreteArea}>
 
                <View style={styles.detailsArea}>
 
                    <Text style={styles.title}>Título</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitulo}
                        value={titulo}
                        textAlign='center'
                    />
                    <Text style={styles.description}>Descrição</Text>
                    <TextInput
                        editable={true}
                        multiline={true}
                        numberOfLines={6}
                        maxLength={60}
                        // onChangeText={text => onChangeText(text)}
                        onChangeText={setCorpo}
                        value={corpo}
                        style={styles.input}
                    />
                    <View style={styles.switchArea}>
                        <Text>Não Concluída</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            value={status}
                            onValueChange={setStatus}
                        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        // ios_backgroundColor="#3e3e3e"                        
                        // value={isEnabled}
                        />
                        <Text>Concluída</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <Button title="Salvar" onPress={() => alert('Lembrete salvo!')} />
                <Button title="Excluir" onPress={() => alert('Lembrete excluído!')} />
            </View>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d2e0f9"
    },
    lembreteArea: {
        flex: 1,
        padding: 20,
        marginTop: 64
    },
    buttonArea: {
        padding: 20,
        flexDirection: "row",
        gap: 32,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 64
    },
    switchArea: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 32
    },
    detailsArea: {
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        color: "#E67A31",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "#4294E7",
        borderRadius: 10,
        padding: 20,
        gap: 16,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#4294E7"
    },
    description: {
        fontSize: 20
    },
 
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 6
    }
})