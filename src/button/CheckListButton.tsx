import React, { useState, MouseEvent, CSSProperties } from "react";
import styles from "./style/checklistbutton.module.css";

interface Props {
    children: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
    baseColor: string; // main color
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const CheckListButton: React.FC<Props> = ({ children, selected = false, disabled, baseColor, onClick }) => {
    const [pressed, setPressed] = useState(false);

    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleMouseLeave = () => setPressed(false);

    const style: CSSProperties = {
        '--base-color': baseColor,
    } as any;

    if (disabled) {
        return (
            <button
                style={style}
                className={`${styles.button} ${styles.disabled}`}
                disabled >
                {children}
            </button>
        );
    }

    return (
        <button
            style={style}
            className={`${styles.button} ${styles.activeBtn} ${selected ? styles.selected : ""} ${pressed ? styles.pressed : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={onClick} >
            {children}
        </button>
    );
};