import { useLayoutEffect, useRef, useState, useCallback, useId } from "react";
import './style/input.css'

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
  const generatedId = useId(); // unique fallback for aria linking
  const textareaId = id || `textarea-${generatedId}`;

  // 🔧 Resize and update char count whenever value changes
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
    <div className={`ext-textarea-wrapper ${addClass}`}>
      {/* Label Area */}
      {label && (
        <div className="ext-textarea-label">
          <label className="ext-textarea-label-title" htmlFor={textareaId}>
            {label} {required && <span className="required">*</span>}
          </label>
          <div className="ext-textarea-label-btns">
            {editable && charCount > 0 && (
              <div className="form-container-count">
                {charCount} / {maxLength}
              </div>
            )}
            {editable && charCount > 0 && (
              <div className="ext-textarea-svg-close" onClick={clear} aria-label={`Clear ${label ?? "text area"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <line x1="8" y1="8" x2="16" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="8" x2="8" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Textarea Box */}
      <div className="ext-textarea-box">
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
          className={`ext-textarea${required && value === "" ? " highlight" : ""}`}
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