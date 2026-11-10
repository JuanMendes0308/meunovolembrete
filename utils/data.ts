import { Filtro, Lembrete } from '../types/lembrete';

export function maskData(texto: string): string {
    const n = texto.replace(/\D/g, '').slice(0, 8);
    if (n.length <= 2) return n;
    if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
    return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

export function maskHora(texto: string): string {
    const n = texto.replace(/\D/g, '').slice(0, 4);
    if (n.length <= 2) return n;
    return `${n.slice(0, 2)}:${n.slice(2)}`;
}

// "25/12/2026" -> "2026-12-25" (null se inválida)
export function dataParaApi(texto: string): string | null {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
    if (!m) return null;
    const [, d, mes, a] = m;
    const dt = new Date(Number(a), Number(mes) - 1, Number(d));
    if (dt.getFullYear() !== Number(a) || dt.getMonth() !== Number(mes) - 1 || dt.getDate() !== Number(d)) {
        return null;
    }
    return `${a}-${mes}-${d}`;
}

// "2026-12-25" -> "25/12/2026"
export function dataDaApi(valor: string | null): string {
    if (!valor) return '';
    const [a, m, d] = valor.slice(0, 10).split('-');
    return a && m && d ? `${d}/${m}/${a}` : '';
}

export function horaValida(texto: string): boolean {
    const m = /^(\d{2}):(\d{2})$/.exec(texto);
    return !!m && Number(m[1]) < 24 && Number(m[2]) < 60;
}

export function hojeIso(): string {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export function filtrar(lista: Lembrete[], filtro: Filtro | null): Lembrete[] {
    const hoje = hojeIso();
    switch (filtro) {
        case 'hoje':
            return lista.filter(l => l.DataLembrete === hoje || l.DiarioLembrete);
        case 'programados':
            return lista.filter(l => !!l.DataLembrete && l.DataLembrete > hoje);
        case 'diarios':
            return lista.filter(l => l.DiarioLembrete);
        default:
            return lista;
    }
}
