import { useRef, useState, useId, useEffect } from "react";
import { DropDownHandle, DropDown } from "../DropDown";
import './style/input-dropdown.css'

type Action = "add" | "remove";

interface Props {
  id?: string;
  tabIndex?: number;
  alwaysOpenDropDown?: boolean;
  closeCommand?: any;
  editable?: boolean;
  label?: string;
  required?: boolean;
  value: string[];
  dropdownValue: string[]
  onChange: (value: string, action: Action) => void;
  placeholder?: string;
  maxLength?: number;
  addClass?: string;
  maxDropDownHeight?: number
}

export const TextAreaDropDown: React.FC<Props> = ({
  id,
  tabIndex,
  alwaysOpenDropDown,
  closeCommand,
  label,
  value,
  editable = true,
  required = false,
  dropdownValue,
  onChange,
  placeholder = 'select or create new entry',
  maxLength = 500,
  addClass,
  maxDropDownHeight = 200
}) => {
  const childRef = useRef<DropDownHandle>(null);
  const textareaRef = useRef<HTMLDivElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [charCount, setCharCount] = useState(value.length);
  const generatedId = useId(); // unique fallback for aria linking
  const textareaId = id || `textarea-${generatedId}`;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [maxDropDownEntries, setMaxDropDownEntries] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState<string[] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterItems, setFilterItem] = useState<string[]>([]);

  useEffect(() => {
    setTags(value);
    setCharCount(value.length);
    if (dropdownValue === undefined) return;
    setMaxDropDownEntries(dropdownValue.length)
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (newBtn && e.key === 'Enter' && searchTerm !== '') {
      createItem();
      return
    }

    if (e.key === "Backspace" && searchTerm === "" && value.length > 0) {
      if (tags?.length) {
        removeTag(tags[tags.length - 1]);
      }
    }
  };

  useEffect(() => {
    if (searchTerm === undefined || value === undefined) return
    const dropDownEntry = dropdownValue.filter(tag => !value.includes(tag))
    if (!searchTerm || searchTerm === '') {
      setFilterItem(dropDownEntry);
      return;
    }

    const filterAndProcessItems = async () => {

      const searchWords = searchTerm
        .toLowerCase()
        .split(/\s+/) // split by whitespace
        .filter(Boolean); // remove empty strings
      const filtered = await Promise.all( // some ✅ ANY search word should match (common) | All shall match -> every
        dropDownEntry
          .filter(item =>
            searchWords.every(word =>
              item.toLowerCase().includes(word.toLowerCase())
            )
          )
          .map(async item => item)
      );
      setFilterItem(filtered);
    };

    filterAndProcessItems();
  }, [searchTerm, value]);

  const removeTag = (tagToRemove: string) => {
    onChange(tagToRemove, 'remove');
    if (childRef.current) childRef.current?.calc()
  };

  const addItem = (entry: number) => {
    if (entry === undefined || !filterItems[entry]) return;
    const newValue = filterItems[entry]
    console.log(newValue)
    onChange(newValue, 'add');
    if (!searchInput.current) return;
    searchInput.current.focus();
    if (childRef.current) childRef.current?.calc()
  }

  const createItem = () => {
    if (searchTerm === undefined || searchTerm === '') return;
    onChange(searchTerm, 'add');
    if (!searchInput.current) return;
    searchInput.current.value = ''
    searchInput.current.focus();
    setSearchTerm("");
    if (childRef.current) childRef.current?.calc()
  }

  const [newBtn, setNewBtn] = useState(false);

  useEffect(() => {
    if (searchTerm === undefined) return;
    if (searchTerm !== "") setOpenDropDown(true); //if closed on !alwaysOpenDropDown
    if (dropdownValue.includes(searchTerm)) {
      setNewBtn(false);
      return;
    } 
    if (searchTerm !== '') setNewBtn(true);
  }, [searchTerm])

  useEffect(() => {
    if (!closeCommand) return;
    setOpenDropDown(false);
  },[closeCommand])

  const focusInput = () => {

    if (alwaysOpenDropDown) {
      setOpenDropDown(true);
      return;
    }
    console.log(searchTerm)
    if (searchTerm) {
      setOpenDropDown(true);
    }
  };

  const blurInput= () => {
    // setOpenDropDown(false)
    // setNewBtn(false)
    // setSearchTerm('')
  }

  if (!tags) return null

  return (
    <div className={`ext-textarea-wrapper-dropdown ${addClass}`} ref={textareaRef}>
      {/* 🏷️ Label Area */}
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
              <div className="ext-textarea-svg-close" aria-label={`Clear ${label ?? "text area"}`}></div>
            )}
          </div>
        </div>
      )}
      {/* ✏️ Textarea Box */}
      <div className={`ext-textarea-box-dropdown${openDropDown ? ' open' : ''}`} onClick={() => focusInput()}>
        <div className="ext-textarea-dropdown-inner">
          {/* tags */}
          {tags.map((item, index) => (
            <div className="textarea-tag loop" key={index}>
              <div>{item}</div>
              <div
                className="textarea-tag-erase"
                onClick={() => removeTag(tags[index])}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <line x1="8" y1="8" x2="16" y2="16" stroke="#333" strokeWidth="1" strokeLinecap="round" />
                  <line x1="16" y1="8" x2="8" y2="16" stroke="#333" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}

          <div className="search-x-wrapper">
            <div className="search-x">
              <div className="search-x-input">
                <input type="text"
                  tabIndex={tabIndex}
                  ref={searchInput}
                  onFocus={() => focusInput()}
                  onBlur={() => blurInput()}
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div
                className={`search-x-btn${newBtn ? ' show' : ''}`}
                onClick={() => createItem()}>
                {newBtn && 'create new one'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropDown ref={childRef} maxDropDownHeight={maxDropDownHeight} openDropDown={openDropDown} display={filterItems} addItem={addItem} maxDropDownEntries={maxDropDownEntries} searchTerm={searchTerm} />
    </div>
  );
};

export default TextAreaDropDown;
