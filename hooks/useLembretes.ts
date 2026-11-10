import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { atualizarLembrete, getAllLembreteByAPI } from '../services/lembrete';
import { Lembrete } from '../types/lembrete';

// Carrega os lembretes sempre que a tela ganha foco (ex.: voltando de criar/editar)
export function useLembretes() {
    const [lembretes, setLembretes] = useState<Lembrete[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    const recarregar = useCallback(async () => {
        try {
            setErro(null);
            setLembretes(await getAllLembreteByAPI());
        } catch (e) {
            setErro('Não foi possível carregar os lembretes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            recarregar();
        }, [recarregar])
    );

    async function alternarStatus(item: Lembrete) {
        const { LembreteId, ...resto } = item;
        try {
            await atualizarLembrete(LembreteId, { ...resto, StatusLembrete: !item.StatusLembrete });
            await recarregar();
        } catch (e) {
            setErro('Não foi possível atualizar o lembrete.');
        }
    }

    return { lembretes, loading, erro, recarregar, alternarStatus };
}
