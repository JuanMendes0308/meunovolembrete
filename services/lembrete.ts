import { Lembrete, LembreteInput } from "../types/lembrete";

// Endereço da API PHP (pasta "api" no servidor). Troque pelo IP/host da sua máquina.
const URL = "http://10.59.47.22/api/Lembrete";

// O MySQL/PDO pode devolver tinyint como "0"/"1": normaliza tudo para o tipo do app
function normalizar(item: any): Lembrete {
    return {
        LembreteId: Number(item.LembreteId),
        TituloLembrete: item.TituloLembrete ?? '',
        DescricaoLembrete: item.DescricaoLembrete ?? '',
        DataLembrete: item.DataLembrete ?? null,
        HorarioLembrete: item.HorarioLembrete ? String(item.HorarioLembrete).slice(0, 5) : null,
        DiarioLembrete: Boolean(Number(item.DiarioLembrete)),
        StatusLembrete: Boolean(Number(item.StatusLembrete)),
    };
}

async function verificar(response: Response, mensagem: string) {
    if (!response.ok) {
        throw new Error(`${mensagem} (${response.status})`);
    }
}

function cabecalhos() {
    return { 'Content-Type': 'application/json' };
}

export async function getAllLembreteByAPI(): Promise<Lembrete[]> {
    const response = await fetch(URL);
    await verificar(response, 'Erro ao listar lembretes');
    const json = await response.json();
    return json.map(normalizar);
}

export async function getLembretesByIdByAPI(pId: number): Promise<Lembrete> {
    const response = await fetch(`${URL}/${pId}`);
    await verificar(response, 'Erro ao buscar lembrete');
    return normalizar(await response.json());
}

export async function criarLembrete(lembrete: LembreteInput) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: cabecalhos(),
        body: JSON.stringify(lembrete),
    });
    await verificar(response, 'Erro ao criar o lembrete');
    return response.json();
}

export async function atualizarLembrete(id: number, lembrete: LembreteInput) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: cabecalhos(),
        body: JSON.stringify(lembrete),
    });
    await verificar(response, 'Erro ao atualizar o lembrete');
    return response.json();
}

export async function excluirLembrete(id: number) {
    const response = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    await verificar(response, 'Erro ao excluir o lembrete');
    return response.json();
}
