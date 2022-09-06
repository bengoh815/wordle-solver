import style from '../styles/text.module.css';

export default function Text(props) {
    const word = props.text.map((str) => str + ", ");
    return (
        <div className={style.text}>
            <p>
                {word}
            </p>
        </div>
    );
}