import { lembreteDados } from "../data/lembreteDados";
import { Lembrete } from "../types/lembrete";

const URL = "http://10.59.47.22/api/Lembrete";

export function getAllLembretes() {
    return lembreteDados.lembretes;
}

// export async function getAllLembretesByAPI() {
//     try {
//         const response = await fetch(URL);
        
//         if (!response.ok) {
//             throw new Error('Erro na requisição: $(response.status)');
//         }

//         const dados = await response.json();
//         return dados.map((item: any) =>({
//             LembreteId: item.lembreteId,
//             TituloLembrete: item.tituloLembrete,
//             DescricaoLembrete: item.descricaoLembrete,
//             StatusLembrete: item.statusLembrete
//         }));
//     } catch (error) {
//         console.error('Erro ao buscar lembretes:', error);
//         return [];
//         };
// }

export function getLembreteById(pId: number) {
    return lembreteDados.lembretes.find(item => item.LembreteId === pId);
}

export async function getAllLembreteByAPI(): Promise<Lembrete[]>{
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function getLembretesByIdByAPI(pId:number): Promise<Lembrete>{
    const response = await fetch(`${URL}/${pId}`);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function criarLembrete(lembrete:Omit<Lembrete, 'LembreteId'>) {
  const lembreteUnico = {
    "TituloLembrete": lembrete.TituloLembrete,
    "DescricaoLembrete": lembrete.DescricaoLembrete,
    "StatusLembrete": lembrete.StatusLembrete
  };
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lembreteUnico)
  });
  if (!response.ok) {
    throw new Error(`Erro ao criar o lembrete`+response.statusText);
  }
 
  console.log(response.json());
  return response.json();
}
 