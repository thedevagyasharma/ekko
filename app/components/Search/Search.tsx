"use client";

import styles from './Search.module.css';
import { useState } from 'react';
import type { EnrichedTrack } from "@/types/spotify";
import { sampleTracks } from '@/lib/sampleTracks';
import { uniqueByISRC, uniqueByNameArtist } from '@/lib/utils';
import { isInLibrary, removeFromLibrary, addToLibrary as addToLib } from '@/lib/library';

import Song from '../Song/Song';

const style_BUTTON = 'px-4 py-2 rounded-md'

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<EnrichedTrack[]>([]);

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            const filteredTracks = uniqueByNameArtist(uniqueByISRC(data.tracks?.items));
            setResults(filteredTracks || []);

            console.log(data);
        } catch (err) {
            console.error("Error fetching tracks:", err);
        }
    };

    const addToLibrary = async (track: EnrichedTrack) => {
        try {
            const res = await fetch(`/api/spotify/a_features?ids=${encodeURIComponent(track.id)}`)
            const data = await res.json();
            const audioFeatures = data.audio_features;
            console.log(data)

            if(audioFeatures) {
                track.audio_features = audioFeatures;
            }
            addToLib(track);
        } catch (err) {
            console.error('Error fetching audio features for ' + track.id );
        }

    }

    return (
        <div className='p-4 rounded-lg bg-zinc-100'>
            <div className="flex flex-col h-auto">
                <label htmlFor="search" className='text-gray-900 uppercase text-xs font-bold'>Search songs</label>
                <input className='px-2 mt-1 mb-2'
                    type="text"
                    id='search'
                    placeholder='Search songs'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={style_BUTTON + ' bg-zinc-900 text-white w-auto self-start'} onClick={handleSearch}>Search</button>
            </div>

            <div className='overflow-y-scroll h-9/10'>
                {results.map((track) => (
                    <Song track={track} isInLibrary={isInLibrary(track.id)} onAdd={()=> addToLibrary(track)} onRemove={()=> removeFromLibrary(track.id)} isSearchResult={true}/>
                ))}
            </div>
        </div>
    )
}

export default Search;