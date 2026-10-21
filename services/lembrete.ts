import { lembreteDados } from "../data/lembreteDados";

const URL = "http://10.59.47.15:5010/Lembrete";

export function getAllLembretes() {
    return lembreteDados.lembretes;
}

export async function getAllLembretesByAPI() {
    try {
        const response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Erro na requisição: $(response.status)');
        }

        const dados = await response.json();
        return dados.map((item: any) =>({
            lembreteId: item.lembreteId,
            tituloLembrete: item.tituloLembrete,
            corpoLembrete: item.corpoLembrete,
            statusLembrete: item.statusLembrete
        }));
    } catch (error) {
        console.error('Erro ao buscar lembretes:', error);
        return [];
        };
}

export function getLembreteById(pId: number) {
    return lembreteDados.lembretes.find(item => item.lembreteId === pId);
}