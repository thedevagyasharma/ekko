"use client";

import styles from './Search.module.css';
import { useState } from 'react';
import type { EnrichedTrack } from "@/types/spotify";
import { sampleTracks } from '@/lib/sampleTracks';
import { uniqueByISRC, uniqueByNameArtist } from '@/lib/utils';
import { isInLibrary, removeFromLibrary, addToLibrary as addToLib } from '@/lib/library';

import Song from '../Song/Song';

const style_BUTTON = 'px-4 py-2 rounded-md'

type SearchProps = {
    
    addToLibrary: (track: EnrichedTrack) => void;
    removeFromLibrary: (id: string) => void;
    isInLibrary: (id: string) => boolean;
    setSelection : (track: EnrichedTrack | null) => void;
}

const Search = ({addToLibrary, removeFromLibrary, isInLibrary, setSelection}: SearchProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<EnrichedTrack[]>([]);

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            console.log(data);
            const filteredTracks = uniqueByNameArtist(uniqueByISRC(data.tracks?.items));
            setResults(filteredTracks || []);

        } catch (err) {
            console.error("Error fetching tracks:", err);
        }
    };

    return (
        <div className='flex flex-col h-full'>
            <div className="flex flex-col shrink-0 p-4 border-b-1 border-zinc-300">
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

            <div className='overflow-y-scroll flex-1 scrollbar scrollbar-thumb-zinc-500 scrollbar-track-transparent px-4'>
                {results.map((track) => (
                    <Song track={track} isInLibrary={isInLibrary(track.id)} onAdd={()=> addToLibrary(track)} onRemove={()=> removeFromLibrary(track.id)} viewMode='search' setSelection={setSelection}/>
                ))}
            </div>
        </div>
    )
}

export default Search;