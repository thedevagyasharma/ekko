import type { Track, Tracks } from '@/types/spotify';

export function uniqueByISRC(tracks: Tracks): Tracks {
    const seen = new Set<string>();
    return tracks.filter((track: Track) => {
        const isrc = track.external_ids?.isrc;
        if (!isrc || seen.has(isrc)) return false;
        seen.add(isrc);
        return true;
    })
}

export function uniqueByNameArtist(tracks: Tracks): Tracks {
    const seen = new Set<string>();
    return tracks.filter((track: Track) => {
        const artistNames = track.artists.map(artist => artist.name).join(",").toLowerCase();
        const compKey = `${track.name.toLowerCase()}|${artistNames}|${track.duration_ms}`;
        if (seen.has(compKey)) return false;
        seen.add(compKey);
        return true;
    })
}

export function getKey(key: number): { name: string, camelot: string, color: string } {
    const keyMap = [
        { name: 'C', camelot: '8B', color: 'fuchsia' }, //0
        { name: 'G', camelot: '9B', color: 'violet' }, //1
        { name: 'D', camelot: '10B', color: 'indigo' }, //2
        { name: 'A', camelot: '11B', color: 'sky' }, //3
        { name: 'E', camelot: '12B', color: 'cyan' }, //4
        { name: 'B', camelot: '1B', color: 'teal' }, //5
        { name: 'F#', camelot: '2B', color: 'emerald' }, //6
        { name: 'Db', camelot: '3B', color: 'lime' }, //7
        { name: 'Ab', camelot: '4B', color: 'yellow' }, //8
        { name: 'Eb', camelot: '5B', color: 'orange' }, //9
        { name: 'Bb', camelot: '6B', color: 'red' }, //10
        { name: 'F', camelot: '7B', color: 'rose' }, //11
        { name: 'Am', camelot: '8A', color: 'fuchsia' }, //12
        { name: 'Em', camelot: '9A', color: 'violet' }, //13
        { name: 'Bm', camelot: '10A', color: 'indigo' }, //14
        { name: 'F#m', camelot: '11A', color: 'sky' }, //15
        { name: 'C#m', camelot: '12A', color: 'cyan' }, //16
        { name: 'G#m', camelot: '1A', color: 'teal' }, //17
        { name: 'D#m', camelot: '2A', color: 'emerald' }, //18
        { name: 'A#m', camelot: '3A', color: 'lime' }, //19
        { name: 'Fm', camelot: '4A', color: 'yellow' }, //20
        { name: 'Cm', camelot: '5A', color: 'orange' }, //21
        { name: 'Gm', camelot: '6A', color: 'red' }, //22
        { name: 'Dm', camelot: '7A', color: 'rose' } //23
    ];
    const songKey = keyMap[key];
    return songKey;
}

export const generateColorClasses = (baseColor: string) => {
    return `text-${baseColor}-800 bg-${baseColor}-100 border-${baseColor}-500`;
}

export const colorSafeList = [
    'text-red-100',
    'text-red-500',
    'text-red-800',
    'text-fuchsia-100',
    'text-fuchsia-500',
    'text-fuchsia-800',
    'text-violet-100',
    'text-violet-500',
    'text-violet-800',
    'text-indigo-100',
    'text-indigo-500',
    'text-indigo-800',
    'text-sky-100',
    'text-sky-500',
    'text-sky-800',
    'text-cyan-100',
    'text-cyan-500',
    'text-cyan-800',
    'text-teal-100',
    'text-teal-500',
    'text-teal-800',
    'text-emerald-100',
    'text-emerald-500',
    'text-emerald-800',
    'text-lime-100',
    'text-lime-500',
    'text-lime-800',
    'text-yellow-100',
    'text-yellow-500',
    'text-yellow-800',
    'text-orange-100',
    'text-orange-500',
    'text-orange-800',
    'text-rose-100',
    'text-rose-500',
    'text-rose-800',
    'bg-red-100',
    'bg-red-500',
    'bg-red-800',
    'bg-fuchsia-100',
    'bg-fuchsia-500',
    'bg-fuchsia-800',
    'bg-violet-100',
    'bg-violet-500',
    'bg-violet-800',
    'bg-indigo-100',
    'bg-indigo-500',
    'bg-indigo-800',
    'bg-sky-100',
    'bg-sky-500',
    'bg-sky-800',
    'bg-cyan-100',
    'bg-cyan-500',
    'bg-cyan-800',
    'bg-teal-100',
    'bg-teal-500',
    'bg-teal-800',
    'bg-emerald-100',
    'bg-emerald-500',
    'bg-emerald-800',
    'bg-lime-100',
    'bg-lime-500',
    'bg-lime-800',
    'bg-yellow-100',
    'bg-yellow-500',
    'bg-yellow-800',
    'bg-orange-100',
    'bg-orange-500',
    'bg-orange-800',
    'bg-rose-100',
    'bg-rose-500',
    'bg-rose-800',
    'border-red-100',
    'border-red-500',
    'border-red-800',
    'border-fuchsia-100',
    'border-fuchsia-500',
    'border-fuchsia-800',
    'border-violet-100',
    'border-violet-500',
    'border-violet-800',
    'border-indigo-100',
    'border-indigo-500',
    'border-indigo-800',
    'border-sky-100',
    'border-sky-500',
    'border-sky-800',
    'border-cyan-100',
    'border-cyan-500',
    'border-cyan-800',
    'border-teal-100',
    'border-teal-500',
    'border-teal-800',
    'border-emerald-100',
    'border-emerald-500',
    'border-emerald-800',
    'border-lime-100',
    'border-lime-500',
    'border-lime-800',
    'border-yellow-100',
    'border-yellow-500',
    'border-yellow-800',
    'border-orange-100',
    'border-orange-500',
    'border-orange-800',
    'border-rose-100',
    'border-rose-500',
    'border-rose-800',
]