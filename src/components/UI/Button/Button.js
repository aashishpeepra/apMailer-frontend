import styles from "./Button.module.css";
import {NavLink} from "react-router-dom";

export default function Button(props){
    switch(props.type){
        case "link":
            return (
                <NavLink exact className={styles.btn} activeClassName={styles.active} to={props.to}>{props.children}</NavLink>
            )
        default:
            return(
                <button disabled={props.disable} type={props.submit ? "submit" : "button"} className={styles.btn} onClick={props.func}>{props.children}</button>
            )
    }
}