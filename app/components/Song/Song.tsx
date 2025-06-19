import type { EnrichedTrack } from "@/types/spotify";

import { Plus, X } from 'lucide-react';


type SongProps = {
    track: EnrichedTrack;
    isInLibrary: boolean;
    onAdd: () => void;
    onRemove: () => void;
    isSearchResult: boolean;
}

const Song = ({ track, isInLibrary, onAdd, onRemove, isSearchResult }: SongProps) => {
    if (isSearchResult) {
        return (
            <div>
                <div className='flex p-4 ps-0 border-b-1 border-zinc-300 items-center' key={track.id}>
                    <div className='w-16 me-2'>
                        <img src={track.album.images?.[0]?.url} alt={track.name} />
                    </div>
                    <div className='flex flex-col flex-auto'>
                        <div className='font-bold'>
                            <h3>{track.name}</h3>
                        </div>
                        <div className=''>
                            <p>{track.artists.map((a) => a.name).join(", ")}</p>
                        </div>
                        <div className=''>
                            <div className='font-bold text-zinc-600'>
                                <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className=''
                        onClick={isInLibrary ? onRemove : onAdd}>
                        <button className='flex gap-2 ps-4 pe-8 py-2 bg-zinc-900 text-white rounded-md'>
                            {isInLibrary ? (
                                <>
                                    <X /> Remove from Library
                                </>
                            ) : (
                                <>
                                    <Plus /> Add to Library
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex track">
                <div className='w-8 me-2 trackImage'>
                    <img src={track.album.images?.[0]?.url} alt={track.name} />
                </div>
                <div className="font-bold trackName">
                    {track.name}
                </div>
                <div className="trackDuration font-bold text-zinc-600">
                    <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                </div>
                <div className="trackBpm">
                    {track.audio_features?.tempo}
                </div>
                <div className="trackKey">

                </div>
                <div className="trackEnergy">

                </div>
                <div className="trackDanceability">

                </div>
                <div className="trackActions">

                </div>
            </div>
        )
    }

}

export default Song;