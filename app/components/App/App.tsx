'use client';

import ControlPanel from "../ControlPanel/ControlPanel";
import Search from "../Search/Search";
import Library from "../Library/Library";
import { use, useState } from "react";
import { getLibrary, removeFromLibrary as removeStored, addToLibrary as addStored, isInLibrary as isStored, updateSongNotes as updateNotesStored } from '@/lib/library';
import { type EnrichedTrack, type SongNotes } from '@/types/spotify';

const App = () => {
    
    const [library, setLibrary] = useState(getLibrary());
    const [selection, setSelection] = useState<EnrichedTrack | null>(null);

    const addToLibrary = (track: EnrichedTrack) => {
        addStored(track);
        setLibrary(getLibrary());
    };

    const removeFromLibrary = (id: string) => {
        removeStored(id);
        setLibrary(getLibrary());
    };

    const isInLibrary = (id: string) => {
        return isStored(id);
    }

    const updateSongNotes = (trackId: string, notes: SongNotes) => {
        updateNotesStored(trackId, notes);
        setLibrary(getLibrary());
    }

    return (
        <div className="flex h-screen p-4 gap-4 overflow-hidden">
            <div className='h-full basis-1/2 xl:basis-2/3 2xl:basis-3/4'>
                <Library library={library} selection={selection} setSelection={setSelection} removeFromLibrary={removeFromLibrary} addToLibrary={() => addToLibrary}/>
            </div>
            <div className='h-full basis-1/2 xl:basis-1/3 2xl:basis-1/4'>
                <ControlPanel addToLibrary={addToLibrary} removeFromLibrary={removeFromLibrary} isInLibrary={isInLibrary} updateSongNotes={updateSongNotes} selection={selection} setSelection={setSelection}/>
            </div>
        </div>
    );
};

export default App;