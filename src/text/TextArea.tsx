import { useLayoutEffect, useRef, useState, useCallback, useId } from "react";
import styles from '../style/textarea.module.css'

interface Props {
  id?: string;
  tabIndex?: number;
  editable?: boolean;
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  addClass?: string;
}

export const TextArea: React.FC<Props> = ({ id, tabIndex, label, value, editable = true, required = false, onChange, placeholder, maxLength = 500, addClass }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(value.length);
  const generatedId = useId();
  const textareaId = id || `textarea-${generatedId}`;

  useLayoutEffect(() => {
    setHeight();
    setCharCount(value.length);
  }, [value]);

  const setHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 20)}px`;
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      onChange(newValue);
      setCharCount(newValue.length);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
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

  return (
    <div className={`${styles.extTextareaWrapper} ${addClass}`}>
      {label && (
        <div className={styles.extTextareaLable}>
          <label className={styles.extTextareaLableTitle} htmlFor={textareaId}>
            {label} {required && <span>*</span>}
          </label>
          <div className={styles.extTextareaLableBtns}>
            {editable && charCount > 0 && (
              <div className={styles.formContainerCount}>
                {charCount} / {maxLength}
              </div>
            )}
            {editable && charCount > 0 && (
              <div className={styles.extTextareaLableSvgClose} onClick={clear} aria-label={`Clear ${label ?? "text area"}`}>
                <svg width="24" height="24" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path className={styles.extTextareaLableSvgClosePath} d="m18.017 5.2673-6.0173 6.0173-6.0173-6.0173-0.71539 0.71539 6.0173 6.0173-6.0173 6.0173 0.71539 0.71539 6.0173-6.0173 6.0173 6.0173 0.71539-0.71539-6.0173-6.0173 6.0173-6.0173z" fill="#000" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.textareaBox}>
        <textarea
          id={textareaId}
          tabIndex={tabIndex}
          ref={textareaRef}
          value={value ?? ""}
          placeholder={placeholder ?? "..."}
          maxLength={maxLength}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={setHeight}
          className={`${styles.extTextarea} ${required && value === "" ? styles.highlight : ""}`}
          rows={1}
          spellCheck={false}
          readOnly={!editable}
          aria-required={required}
          aria-label={label}
        />
      </div>
    </div>
  );
};