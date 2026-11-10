export type Lembrete = {
    LembreteId: number;
    TituloLembrete: string;
    DescricaoLembrete: string;       // "Nota" no layout
    DataLembrete: string | null;     // AAAA-MM-DD
    HorarioLembrete: string | null;  // HH:MM
    DiarioLembrete: boolean;
    StatusLembrete: boolean;         // concluído
};

export type LembreteInput = Omit<Lembrete, 'LembreteId'>;

export type Filtro = 'hoje' | 'programados' | 'todos' | 'diarios';
