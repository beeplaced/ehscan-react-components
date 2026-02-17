import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
export const FoldedElement = ({ folded, children }) => {
    return (_jsx(AnimatePresence, { initial: false, children: !folded && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: "easeInOut" }, style: { overflow: "hidden" }, children: children }, "content")) }));
};
