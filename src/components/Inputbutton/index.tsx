import styles from "./index.module.css"
import { Send } from 'lucide-react';

interface InputbuttonProps{
    text?: string;
};

const Inputbutton = ({text}:InputbuttonProps) =>{
    return(
        <div className={styles.Inputbutton}>
            <input className={styles.form} type="text" placeholder="気づいたこと調べたことを記録しよう"　size={40}>{text}</input>
            <button className={styles.button}><Send className={styles.Send}></Send></button>

        </div>
    );
}
export default Inputbutton;