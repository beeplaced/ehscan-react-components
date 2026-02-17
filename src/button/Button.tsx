import { useRef, useCallback, ReactNode } from "react";
import useRipple from "../tools/useRipple";
import styles from '../style/button.module.css'

type Props = {
  index?: string | number;
  text?: string;
  selected?: boolean;
  injectCSS?: string;
  notimeout?: boolean;
  click?: (args?: any) => void;
  type?: "raw" | "pop" | "ripple";
  children?: ReactNode; //icon or else
};

export const Button: React.FC<Props> = ({ index, text, selected, injectCSS, notimeout, click, type = "raw", children }) => {

  const buttonRef = useRef(null);
  const handleRipple = useRipple();

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (type === 'ripple') handleRipple(event, buttonRef as unknown as React.RefObject<HTMLElement>);
      if (notimeout) {
        click?.(event);
        return;
      }
      setTimeout(() => {
        click?.(event);
      }, 200);
    },
    [notimeout, click, handleRipple]
  );

  return (<>
    <button
      key={index}
      type="button"
      ref={buttonRef}
      onClick={handleButtonClick}
      className={`${styles.button} ${styles.ApplyRipple} ${injectCSS ?? styles.btnPrimary}${type === 'pop' ? ` ${styles.buttonPop}` : ''}`}
      aria-pressed={selected} >
      {children}
      {text && <div className={styles.btnLabel}>{text}</div>}
    </button>
  </>)
}