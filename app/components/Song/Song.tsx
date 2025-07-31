import type { EnrichedTrack } from "@/types/spotify";

import { Plus, X, NotebookPen, Trash2, PackagePlus } from 'lucide-react';
import { getKey, generateColorClasses } from "@/lib/utils";


type SongProps = {
    track: EnrichedTrack;
    isInLibrary: boolean;
    onAdd: () => void;
    onRemove: () => void;
    setSelection: (track: EnrichedTrack | null) => void;
    viewMode: string;
}

const Song = ({ track, isInLibrary, onAdd, onRemove, setSelection, viewMode }: SongProps) => {
    const color = track.notes ? getKey(track.notes?.key).color : ``;
    const colorClass =  generateColorClasses(color) as string;
    if (viewMode === 'search') {
        return (
            <div>
                <div className='flex py-4 border-b-1 border-zinc-300 items-center' key={track.id}>
                    <div className='w-16 me-2'>
                        <img src={track.album.images?.[0]?.url} alt={track.name} />
                    </div>
                    <div className='flex flex-col flex-auto'>
                        <div className='font-bold'>
                            <h3>{track.name}</h3>
                        </div>
                        <div>
                            <p>{track.artists.map((a) => a.name).join(", ")}</p>
                        </div>
                        <div>
                            <div className='font-bold text-zinc-600'>
                                <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                            </div>
                        </div>
                    </div>
                    <div

                        onClick={isInLibrary ? onRemove : onAdd}>
                        <button className='flex gap-2 p-1 bg-zinc-900 text-white rounded-md cursor-pointer'>
                            {isInLibrary ? (
                                <>
                                    <X />
                                </>
                            ) : (
                                <>
                                    <Plus />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    } else if (viewMode === 'compact') {
        return (
            <div className="flex track items-center justify-between ps-0 pb-2 mb-2 border-b-1 border-zinc-300">
                <div className="flex items-center">
                    <div className='w-8 me-2 trackImage'>
                        <img className="rounded-sm" src={track.album.images?.[0]?.url} alt={track.name} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium text-sm trackName">
                            {track.name}
                        </div>
                        <div className="trackArtist text-xs leading-tight">
                            {track.artists.map((a) => a.name).join(", ")}
                        </div>
                    </div>
                </div>
                <div className="trackDuration font-bold text-zinc-600">
                    <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                </div>
            </div>
        );
    }
    else if (viewMode === 'table') {
        return (
            <tr className="text-sm hover:bg-zinc-50">
                <td className='w-8 p-2 trackImage'>
                    <img className="rounded-sm" src={track.album.images?.[0]?.url} alt={track.name} />
                </td>
                <td className="font-medium trackName truncate">
                    {track.name}
                </td>
                <td className="text-center trackDuration font-bold text-zinc-600">
                    <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                </td>
                <td className="text-center trackBpm font-bold">
                    {track.notes?.bpm}
                </td>
                <td className="text-center trackCKey font-bold">
                    {track.notes?.key && (
                        <>
                            <div className="inline-block">
                                <div className={`border-2 rounded-full px-2 ${colorClass || ''}`}>
                                    {getKey(track.notes?.key).camelot}
                                </div>
                            </div>
                        </>
                    )}
                </td>
                <td className="text-center trackHKey font-bold">
                    {track.notes?.key && (
                        <>
                            <div className="inline-block">
                                <div className={`border-2 rounded-full px-2 ${colorClass || ''}`}>
                                    {getKey(track.notes?.key).name}
                                </div>
                            </div>
                        </>
                    )}
                </td>
                <td className="text-center trackEnergy font-bold">
                    {track.notes?.energy}
                </td>
                <td className="trackArtists text-zinc-500 font-bold">
                    <div className="trackArtist text-xs leading-tight">
                        {track.artists.length > 1
                            ? `${track.artists[0].name}, +${track.artists.length - 1} other`
                            : track.artists[0].name}
                    </div>
                </td>
                <td className="trackActions align-middle">
                    <div className="flex items-center gap-2">
                        <button className="editNotes text-zinc-700 bg-zinc-200 p-2 rounded-lg cursor-pointer hover:bg-zinc-300" onClick={() => setSelection(track)} title="Add/Edit Notes">
                            <NotebookPen strokeWidth={2} size={16} />
                        </button>
                        <button className="addToCrate text-zinc-700 bg-zinc-200 p-2 rounded-lg cursor-pointer hover:bg-zinc-300" title="Add to crate">
                            <PackagePlus strokeWidth={2} size={16} />
                        </button>
                        <button className="deleteFromLib text-red-700 bg-red-200 p-2 rounded-lg cursor-pointer hover:bg-red-300" title="Delete from library" onClick={() => onRemove()}>
                            <Trash2 strokeWidth={2} size={16} />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
    else if (viewMode === 'notes') {
        return (
            <>
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex gap-2">
                        <div className='w-24 trackImage'>
                            <img className="rounded-md" src={track.album.images?.[0]?.url} alt={track.name} />
                        </div>
                        <div className="">
                            <div className="text-xl font-medium trackName">
                                {track.name}
                            </div>
                            <div className="trackArtist text-sm leading-tight">
                                {track.artists.map((a) => a.name).join(", ")}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="trackAlbum">
                            <div className="text-xs font-bold uppercase text-gray-900">Album</div>
                            <div>{track.album.name}</div>
                        </div>
                        <div className="trackDuration">
                            <div className="text-xs font-bold uppercase text-gray-900">MM:SS</div>
                            <span>{`${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default Song;