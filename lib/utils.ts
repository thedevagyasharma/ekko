import type { Track, Tracks } from '@/types/spotify';

export function uniqueByISRC(tracks: Tracks): Tracks {
    const seen = new Set<string>();
    return tracks.filter((track: Track) => {
        const isrc = track.external_ids?.isrc;
        if(!isrc || seen.has(isrc)) return false;
        seen.add(isrc);
        return true;
    })
}

export function uniqueByNameArtist(tracks: Tracks): Tracks {
    const seen = new Set<string>();
    return tracks.filter((track: Track) => {
        const artistNames = track.artists.map(artist => artist.name).join(",").toLowerCase();
        const compKey = `${track.name.toLowerCase()}|${artistNames}|${track.duration_ms}`;
        if(seen.has(compKey)) return false;
        seen.add(compKey);
        return true;
    })
}