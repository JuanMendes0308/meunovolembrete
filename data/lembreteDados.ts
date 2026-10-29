import { Lembrete } from "../types/lembrete";
 
type Lembretes = {
    lembretes: Lembrete[]
};
export const lembreteDados: Lembretes = {
    lembretes: [
        {
            LembreteId: 1,
            TituloLembrete: 'Pagar',
            DescricaoLembrete: 'Pagar conta de luz ref AGO25',
            StatusLembrete: false
        },
        {
            LembreteId: 2,
            TituloLembrete: 'Comprar',
            DescricaoLembrete: 'Comprar comida para o mês',
            StatusLembrete: true
        },
        {
            LembreteId: 3,
            TituloLembrete: 'Comprar',
            DescricaoLembrete: 'Comprar presente do dia dos namorados',
            StatusLembrete: false
        },
        {
            LembreteId: 4,
            TituloLembrete: 'Carro',
            DescricaoLembrete: 'Levar carro para revisão',
            StatusLembrete: true
        },
        {
            LembreteId: 5,
            TituloLembrete: 'Pagar',
            DescricaoLembrete: 'Pagar condomínio ref AGO25 ',
            StatusLembrete: false
        },
        {
            LembreteId: 6,
            TituloLembrete: 'Estudar',
            DescricaoLembrete: 'Estudar RN 1h por dia ',
            StatusLembrete: true
        },
        {
            LembreteId: 7,
            TituloLembrete: 'Carro',
            DescricaoLembrete: 'Abastecer o carro',
            StatusLembrete: false
        }
    ]
}