import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useCallback } from "react";
import useRipple from "../tools/useRipple";
import styles from '../style/button.module.css';
export const Button = ({ index, text, selected, injectCSS, notimeout, click, type = "raw", children }) => {
    const buttonRef = useRef(null);
    const handleRipple = useRipple();
    const handleButtonClick = useCallback((event) => {
        if (type === 'ripple')
            handleRipple(event, buttonRef);
        if (notimeout) {
            click === null || click === void 0 ? void 0 : click(event);
            return;
        }
        setTimeout(() => {
            click === null || click === void 0 ? void 0 : click(event);
        }, 200);
    }, [notimeout, click, handleRipple]);
    return (_jsx(_Fragment, { children: _jsxs("button", { type: "button", ref: buttonRef, onClick: handleButtonClick, className: `${styles.button} ${styles.ApplyRipple} ${injectCSS !== null && injectCSS !== void 0 ? injectCSS : styles.btnPrimary}${type === 'pop' ? ` ${styles.buttonPop}` : ''}`, "aria-pressed": selected, children: [children, text && _jsx("div", { className: styles.btnLabel, children: text })] }, index) }));
};
