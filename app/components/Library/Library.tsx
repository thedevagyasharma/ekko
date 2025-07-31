'use client';
import { useState } from 'react';

import Song from '../Song/Song';
import type { EnrichedTrack } from '@/types/spotify';

type LibraryProps = {
    library: EnrichedTrack[];
    removeFromLibrary: (id: string) => void;
    addToLibrary: (track: EnrichedTrack) => void;
    selection: EnrichedTrack | null;
    setSelection: (track: EnrichedTrack | null) => void;
}

const Library = ({ library, removeFromLibrary, addToLibrary, setSelection, selection }: LibraryProps) => {
    const [viewMode, setViewMode] = useState<'compact' | 'table'>('compact');
    return (
        <>
            <div className='p-4 rounded-lg bg-zinc-100'>
                <div className='flex justify-between pb-4'>
                    <h2 className='text-2xl font-bold'>Library</h2>
                    {/* TODO: Write a Toggle Component */}
                    <button
                        onClick={() => setViewMode(viewMode === 'compact' ? 'table' : 'compact')}
                        className="bg-zinc-300 text-sm px-3 py-1 rounded hover:bg-zinc-400"
                    >
                        {viewMode === 'compact' ? 'Table View' : 'Compact View'}
                    </button>
                </div>

                {(!library.length) && (
                    <div>
                        <p className="text-center text-zinc-600 mt-8">Your library is empty.</p>
                    </div>
                )}
                {(library.length) >= 1 && viewMode === 'compact' && (
                    <>
                        {library.map((song) => (
                            <Song
                                key={song.id}
                                isInLibrary={true}
                                track={song}
                                onRemove={() => removeFromLibrary(song.id)}
                                onAdd={() => addToLibrary(song)}
                                setSelection={setSelection}
                                viewMode='compact'
                            />
                        ))}
                    </>
                )}
                {(library.length) >= 1 && viewMode === 'table' && (
                    <>
                        <table className="min-w-full">
                            <thead className="bg-zinc-100 text-xs text-zinc-600">
                                <tr className='border-b border-zinc-300'>
                                    <th className="px-2 pb-2 text-center">Cover</th>
                                    <th className="px-2 pb-2 text-center">Name</th>
                                    <th className="px-2 pb-2 text-center">Duration</th>
                                    <th className="px-2 pb-2 text-center">BPM</th>
                                    <th className="px-2 pb-2 text-center">Camelot Key</th>
                                    <th className="px-2 pb-2 text-center">Harmonic Key</th>
                                    <th className="px-2 pb-2 text-center">Energy</th>
                                    <th className="px-2 pb-2 text-center">Artists</th>
                                    <th className="px-2 pb-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {library.map((song) => (
                                    <Song
                                        key={song.id}
                                        isInLibrary={true}
                                        track={song}
                                        onRemove={() => removeFromLibrary(song.id)}
                                        onAdd={() => addToLibrary(song)}
                                        setSelection={setSelection}
                                        viewMode='table'
                                    />
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );

}

export default Library;