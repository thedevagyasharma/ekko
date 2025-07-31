import { useState, useEffect } from "react";
import { EnrichedTrack, SongNotes } from "@/types/spotify";
import Song from "../Song/Song";


type NoteProps = {
    selection: EnrichedTrack | null;
    setSelection: (track: EnrichedTrack | null) => void;
    updateSongNotes: (trackId: string, notes: SongNotes) => void;
    addToLibrary: (track: EnrichedTrack) => void;
    removeFromLibrary: (id: string) => void;
}

const Note = ({ selection, updateSongNotes, setSelection, addToLibrary, removeFromLibrary }: NoteProps) => {
    const [bpm, setBpm] = useState(0);
    const [key, setKey] = useState(0);
    const [energy, setEnergy] = useState(0);

    useEffect(()=> {
        if(selection?.notes) {
            setBpm(selection.notes.bpm || 0);
            setKey(selection.notes.key || 0);
            setEnergy(selection.notes.energy || 0);
        } else {
            setBpm(0);
            setKey(0);
            setEnergy(0);
        }
    }, [selection]);

    const handleSave = () => {
        if(!selection) return;
        const newNotes: SongNotes = {
            bpm: bpm,
            key: key,
            energy: energy,
        };
        updateSongNotes(selection.id, newNotes);
    }
    //TODO: Make the key selector more intuitive
    return (
        <>
            {(selection === null) && (
                <>
                    Select a song in your library to add notes.
                </>
            )}
            {selection && (
                <>
                    <Song key={selection.id}
                        isInLibrary={true}
                        track={selection}
                        onRemove={() => removeFromLibrary(selection.id)}
                        onAdd={() => addToLibrary(selection)}
                        setSelection={setSelection}
                        viewMode='notes'
                    />
                    <div className="flex gap-2 w-full px-4">
                        <div className="flex-1">
                            <label htmlFor="bpm" className='text-gray-900 uppercase text-xs font-bold'>BPM</label>
                            <input className='w-full px-2 mt-1 mb-2 bg-zinc-50 rounded border border-zinc-300'
                                type="number"
                                id='bpm'
                                placeholder='BPM'
                                value={bpm}
                                onChange={(e) => setBpm(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="key" className='text-gray-900 uppercase text-xs font-bold'>Key</label>
                            <input className='w-full px-2 mt-1 mb-2 bg-zinc-50 rounded border border-zinc-300'
                                type="number"
                                id='key'
                                placeholder='Key'
                                value={key}
                                onChange={(e) => setKey(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="energy" className='text-gray-900 uppercase text-xs font-bold'>Energy</label>
                            <input className='w-full px-2 mt-1 mb-2 bg-zinc-50 rounded border border-zinc-300'
                                type="number"
                                id='energy'
                                placeholder='Energy'
                                value={energy}
                                onChange={(e) => setEnergy(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="px-4">
                        <button
                            onClick={handleSave}
                            className="mt-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer hover:bg-zinc-800 transition-all"
                        >
                            Save Notes
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Note;