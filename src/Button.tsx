import { useRef, useCallback, ReactNode } from "react";
import useRipple from "./tools/useRipple";

type Props = {
  index?: string | number;
  text?: string;
  selected?: boolean;
  addClass?: string;
  notimeout?: boolean;
  size?: 'sm' | 'md' | 'lg';
  click?: (args?: any) => void;
  children?: ReactNode; //icon
};

export const Button: React.FC<Props> = ({ index, text, selected, addClass, notimeout, size = 'md', click, children }) => {

  const buttonRef = useRef(null);
  const handleRipple = useRipple();

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      handleRipple(event, buttonRef as unknown as React.RefObject<HTMLElement>);

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
      className={`ext-btn ext-btn--primary ext-btn--${size} _ripple ${addClass ?? ''}`}
      aria-pressed={selected} >
      {children}
      {text && <div className="ext-btn-label">{text}</div>}
    </button>
  </>)
}