import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import styles from "../style/checklistbutton.module.css";
export const CheckListButton = ({ children, selected = false, disabled, baseColor, onClick }) => {
    const [pressed, setPressed] = useState(false);
    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleMouseLeave = () => setPressed(false);
    const style = {
        '--base-color': baseColor,
    };
    if (disabled) {
        return (_jsx("button", { style: style, className: `${styles.button} ${styles.disabled}`, disabled: true, children: children }));
    }
    return (_jsx("button", { style: style, className: `${styles.button} ${styles.activeBtn} ${selected ? styles.selected : ""} ${pressed ? styles.pressed : ""}`, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseLeave, onClick: onClick, children: children }));
};
