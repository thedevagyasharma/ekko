import { Search, LibraryBig } from "lucide-react";

type NavbarProps = {
    currentView: string;
    setView: (view: string) => void;
}

const style_NAVBUTTON = 'flex flex-col items-center text-xs uppercase font-800 gap-1 p-2 m-2 rounded-md hover:bg-zinc-200 transition duration-150 ease-in-out active:bg-zinc-300';

const style_NAVBUTTON__ACTIVE = style_NAVBUTTON + ' bg-zinc-300 hover:bg-zinc-300';

const Navbar = ({currentView, setView}: NavbarProps) => {

    return(
        <nav className="flex flex-col gap-2 center">
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
        </nav>
    );
}

export default Navbar;