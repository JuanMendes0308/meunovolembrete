import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { criarLembrete } from '../../services/lembrete';
import { Lembrete } from '../../types/lembrete';
import { router } from 'expo-router';

export default function Add() {
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);

    async function handleLembreteAdd(){
                console.log(titulo + " " + descricao + " " + status.toString());
        try {
            const novoLembrete: Omit<Lembrete, 'LembreteId'>= {
                "TituloLembrete":titulo,
                "DescricaoLembrete":descricao,
                "StatusLembrete":status
            };
            await criarLembrete(novoLembrete);
            Alert.alert('Sucesso', 'Lembrete criado com sucesso!');
            router.replace('/(home)/list');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível criar o lembrete.' + error);
        }
    };

    function adicionarLembrete() {
        if (titulo.trim() === '' || descricao.trim() === '') {
            Alert.alert('Atenção', 'Preencha o título e a descrição!');
            return;
        }

        Alert.alert(
            'Sucesso',
            'Lembrete: ' + titulo + '\nDescrição: ' + descricao
        );

        setTitulo('');
        setDescricao('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Adicionar Lembrete</Text>

            <TextInput
                style={styles.input}
                placeholder="Título do lembrete"
                value={titulo}
                onChangeText={setTitulo}
            />

            <TextInput
                style={styles.textArea}
                placeholder="Digite a descrição do lembrete"
                value={descricao}
                onChangeText={setDescricao}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={handleLembreteAdd}
            >
                <Text style={styles.textoBotao}>ADICIONAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        height: 120,
        marginBottom: 20,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});