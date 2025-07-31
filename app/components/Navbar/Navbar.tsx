import { Search, Notebook, Package } from "lucide-react";

type NavbarProps = {
    currentView: string;
    setView: (view: string) => void;
}

const style_NAVBUTTON = 'flex items-center text-xs uppercase font-800 gap-1 px-4 py-2 m-0 rounded-t-lg border border-b-0 border-transparent bg-zinc-100  hover:bg-zinc-200 transition duration-150 ease-in-out active:bg-zinc-300';

const style_NAVBUTTON__ACTIVE = style_NAVBUTTON + ' bg-zinc-350 border-zinc-300 hover:bg-zinc-300';


const Navbar = ({currentView, setView}: NavbarProps) => {

    return(
        <nav className="flex gap-0 center w-full">
            <button
                className={(currentView === 'search') ? style_NAVBUTTON__ACTIVE : style_NAVBUTTON }
                onClick={()=>setView('search')}
            >
                <Search/> Search
            </button>
            <button
                className={(currentView === 'notes') ? style_NAVBUTTON__ACTIVE : style_NAVBUTTON }
                onClick={()=>setView('notes')}
            >
                <Notebook /> Notes
            </button>
            <button
                className={(currentView === 'crates') ? style_NAVBUTTON__ACTIVE : style_NAVBUTTON }
                onClick={()=>setView('crates')}
            >
                <Package /> Crates
            </button>
        </nav>
    );
}

export default Navbar;