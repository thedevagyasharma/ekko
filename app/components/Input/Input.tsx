import styles from "./Input.module.css";
import { Search } from 'lucide-react';

const Input = () => {
 return(
        <div className={styles.input}>
        <input 
        type="text" 
        placeholder="Type here..."/>
        <Search color="black"></Search>
        </div>
        
 );   
};

export default Input;