import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState, useCallback, useId } from "react";
import styles from '../style/textarea.module.css';
export const TextArea = ({ id, tabIndex, label, value, editable = true, required = false, onChange, placeholder, maxLength = 500, addClass }) => {
    const textareaRef = useRef(null);
    const [charCount, setCharCount] = useState(value.length);
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;
    useLayoutEffect(() => {
        setHeight();
        setCharCount(value.length);
    }, [value]);
    const setHeight = () => {
        const el = textareaRef.current;
        if (!el)
            return;
        el.style.height = "auto";
        el.style.height = `${Math.max(el.scrollHeight, 20)}px`;
    };
    const handleInputChange = useCallback((event) => {
        const newValue = event.target.value;
        onChange(newValue);
        setCharCount(newValue.length);
    }, [onChange]);
    const handleFocus = useCallback(() => {
        const el = textareaRef.current;
        if (!el)
            return;
        requestAnimationFrame(() => {
            el.focus({ preventScroll: true });
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        setHeight();
    }, []);
    const clear = useCallback(() => {
        onChange("");
        setCharCount(0);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [onChange]);
    return (_jsxs("div", { className: `${styles.extTextareaWrapper} ${addClass}`, children: [label && (_jsxs("div", { className: styles.extTextareaLable, children: [_jsxs("label", { className: styles.extTextareaLableTitle, htmlFor: textareaId, children: [label, " ", required && _jsx("span", { children: "*" })] }), _jsxs("div", { className: styles.extTextareaLableBtns, children: [editable && charCount > 0 && (_jsxs("div", { className: styles.formContainerCount, children: [charCount, " / ", maxLength] })), editable && charCount > 0 && (_jsx("div", { className: styles.extTextareaLableSvgClose, onClick: clear, "aria-label": `Clear ${label !== null && label !== void 0 ? label : "text area"}`, children: _jsx("svg", { width: "24", height: "24", fill: "none", version: "1.1", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { className: styles.extTextareaLableSvgClosePath, d: "m18.017 5.2673-6.0173 6.0173-6.0173-6.0173-0.71539 0.71539 6.0173 6.0173-6.0173 6.0173 0.71539 0.71539 6.0173-6.0173 6.0173 6.0173 0.71539-0.71539-6.0173-6.0173 6.0173-6.0173z", fill: "#000" }) }) }))] })] })), _jsx("div", { className: styles.textareaBox, children: _jsx("textarea", { id: textareaId, tabIndex: tabIndex, ref: textareaRef, value: value !== null && value !== void 0 ? value : "", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "...", maxLength: maxLength, onChange: handleInputChange, onFocus: handleFocus, onBlur: setHeight, className: `${styles.extTextarea} ${required && value === "" ? styles.highlight : ""}`, rows: 1, spellCheck: false, readOnly: !editable, "aria-required": required, "aria-label": label }) })] }));
};
