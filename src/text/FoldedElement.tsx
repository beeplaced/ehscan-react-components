import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  folded: boolean;
  children: ReactNode;
};

export const FoldedElement: React.FC<Props> = ({ folded, children }) => {

    return (
    <AnimatePresence initial={false}>
      {!folded && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};