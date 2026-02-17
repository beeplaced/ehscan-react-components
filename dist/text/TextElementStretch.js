import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styles from '../style/text.module.css';
export const TextElementStretch = ({ text }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: styles.textElementStretch, children: text }) }));
};
