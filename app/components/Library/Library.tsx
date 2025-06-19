'use client';

import { addToLibrary } from '@/lib/library';
import Song from '../Song/Song';
import styles from './Library.module.css';
import type { EnrichedTrack } from '@/types/spotify';

type LibraryProps = {
    library: EnrichedTrack[];
    removeFromLibrary: (id: string) => void;
    addToLibrary: (id: string) => void;
}

const Library = ({ library, removeFromLibrary }: LibraryProps) => {

    if (!library.length) {
        return (
            <div>
                <p className="text-center text-zinc-600 mt-8">Your library is empty.</p>
            </div>
        )
    } else {
        return (
            <div>
                {library.map((song) => (
                    <Song
                        key={song.id}
                        isInLibrary={true}
                        track={song}
                        onRemove={() => removeFromLibrary(song.id)}
                        onAdd={() => addToLibrary(song)}
                        isSearchResult={false}
                    />
                ))}
            </div>
        )
    }

    return (
        <></>
    );
}

export default Library;
