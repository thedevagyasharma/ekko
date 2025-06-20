'use client';

import Navbar from '../Navbar/Navbar';
import Search from "../Search/Search";
import Library from "../Library/Library";
import { use, useState } from "react";
import { getLibrary, removeFromLibrary as removeStored, addToLibrary as addStored } from '@/lib/library';
import { EnrichedTrack } from '@/types/spotify';

const App = () => {
    const [view, setView] = useState("search");
    const [library, setLibrary] = useState(getLibrary());

    const addToLibrary = (track: EnrichedTrack) => {
        addStored(track);
        setLibrary(getLibrary());
    };

    const removeFromLibrary = (id: string) => {
        removeStored(id);
        setLibrary(getLibrary());
    };

    return (
        <div className="flex h-screen p-4 gap-4">
            <div className='w-auto h-full bg-zinc-100 rounded-lg text-zinc-900'>
                <Navbar currentView={view} setView={setView} />
            </div>
            <main>
                {view === 'search' && (
                    <Search />
                )}
                {view === 'library' && (
                    <Library library={library} removeFromLibrary={removeFromLibrary} addToLibrary={() => addToLibrary} />
                )}
            </main>

        </div>
    );
};

export default App;