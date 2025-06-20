import { Search, LibraryBig } from "lucide-react";

type NavbarProps = {
    currentView: string;
    setView: (view: string) => void;
}

const style_NAVBUTTON = 'flex flex-col items-center text-xs uppercase font-800 gap-1 p-2 m-2 rounded-md hover:bg-zinc-200 transition duration-150 ease-in-out active:bg-zinc-300';

const style_NAVBUTTON__ACTIVE = style_NAVBUTTON + ' bg-zinc-300 hover:bg-zinc-300';

const Navbar = ({currentView, setView}: NavbarProps) => {

    return(
        <nav className="flex flex-col gap-2 center h-full">
            <button
                className={(currentView === 'search') ? style_NAVBUTTON__ACTIVE : style_NAVBUTTON }
                onClick={()=>setView('search')}
            >
                <Search/> Search
            </button>
            <button
                className={(currentView === 'library') ? style_NAVBUTTON__ACTIVE : style_NAVBUTTON }
                onClick={()=>setView('library')}
            >
                <LibraryBig />Library
            </button>
            <div className="relative group mt-auto">
                <a className={style_NAVBUTTON} href="https://getsongbpm.com/"> <img className="w-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty8vQohWui6NAm-wHWnQoNZwZW0GbfNVroA&s" alt="Created with GetSongbpm.com" /></a>
                <p className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-zinc-200 text-zinc-800 font-medium text-sm px-2 py-1 rounded-full whitespace-nowrap pointer-events-none transition-opacity duration-200">Made with GetSongbpm.com</p>
            </div>
        </nav>
    );
}

export default Navbar;