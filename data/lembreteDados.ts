import { Lembrete } from "../types/lembrete";
 
type Lembretes = {
    lembretes: Lembrete[]
};
export const lembreteDados: Lembretes = {
    lembretes: [
        {
            lembreteId: 1,
            tituloLembrete: 'Pagar',
            corpoLembrete: 'Pagar conta de luz ref AGO25',
            statusLembrete: false
        },
        {
            lembreteId: 2,
            tituloLembrete: 'Comprar',
            corpoLembrete: 'Comprar comida para o mês',
            statusLembrete: true
        },
        {
            lembreteId: 3,
            tituloLembrete: 'Comprar',
            corpoLembrete: 'Comprar presente do dia dos namorados',
            statusLembrete: false
        },
        {
            lembreteId: 4,
            tituloLembrete: 'Carro',
            corpoLembrete: 'Levar carro para revisão',
            statusLembrete: true
        },
        {
            lembreteId: 5,
            tituloLembrete: 'Pagar',
            corpoLembrete: 'Pagar condomínio ref AGO25 ',
            statusLembrete: false
        },
        {
            lembreteId: 6,
            tituloLembrete: 'Estudar',
            corpoLembrete: 'Estudar RN 1h por dia ',
            statusLembrete: true
        },
        {
            lembreteId: 7,
            tituloLembrete: 'Carro',
            corpoLembrete: 'Abastecer o carro',
            statusLembrete: false
        }
    ]
}