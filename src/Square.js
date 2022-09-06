import styles from "../styles/Square.module.css"

export default function Square(props) {
    return (
        <div className={styles.square}>
            {props.value}
        </div>
    );
}