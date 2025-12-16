import styles from '../style/text.module.css';

type Props = {
    text: string;
}

export const TextElementStretch: React.FC<Props> = ({ text }) => {
    return (<>
        <div className={styles.textElementStretch}>
            {text}
        </div>
    </>)
}
