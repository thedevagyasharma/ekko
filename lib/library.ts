import type { EnrichedTrack, AudioFeatures } from '@/types/spotify';

const LIBRARY_KEY = 'myLib';

export function getLibrary():  EnrichedTrack[]{
     if (typeof window === "undefined") return [];
    const data = localStorage.getItem(LIBRARY_KEY);
    return data ? JSON.parse(data): [];
}

export function saveLibrary(tracks: EnrichedTrack[]){
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(tracks));
}

export function addToLibrary(track: EnrichedTrack){
    const library = getLibrary();
    const alreadyExists = library.some(t=> t.id === track.id);
    if(!alreadyExists) {
        saveLibrary([...library, track]);
    }
}

export function removeFromLibrary(trackId: string) {
    const library = getLibrary().filter(t => t.id !==trackId);
    saveLibrary(library);
}

export function isInLibrary(trackId: string): boolean {
    return getLibrary().some(t=> t.id === trackId);
}