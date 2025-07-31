import { useState } from "react";

import type { EnrichedTrack, SongNotes } from "@/types/spotify";

import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Note from "../Note/Note";

type ControlPanelProps = {
    addToLibrary: (track: EnrichedTrack) => void;
    removeFromLibrary: (id: string) => void;
    isInLibrary: (id: string) => boolean;
    updateSongNotes: (trackId: string, notes: SongNotes) => void;
    selection: EnrichedTrack | null;
    setSelection : (track: EnrichedTrack | null) => void;
}

const ControlPanel = ({ addToLibrary, removeFromLibrary, isInLibrary, selection, updateSongNotes, setSelection }: ControlPanelProps) => {
    const [view, setView] = useState("search");

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Navbar currentView={view} setView={setView} />
            <div className="flex-1 overflow-hidden border-1 border-zinc-300 bg-zinc-100 rounded-b-lg">
                {view == 'search' && (
                    <>
                        <Search removeFromLibrary={removeFromLibrary} addToLibrary={addToLibrary} isInLibrary={isInLibrary} setSelection={setSelection}/>
                    </>
                )}
                {view === 'notes' && (
                    <>
                       <Note selection={selection} updateSongNotes={updateSongNotes} setSelection={setSelection} removeFromLibrary={removeFromLibrary} addToLibrary={addToLibrary}/>
                    </>
                )}
            </div>
            
        </div>
    );
}

export default ControlPanel;