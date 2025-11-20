import React from "react";
import './style/addbox.css'

interface Entry {
  id: number;
  title: string;
}

interface Props {
  title: string;
  value: Entry[];
  onChange: (value: string | Entry[], id?: number) => void;
}

export const AddBox: React.FC<Props> = ({ title, value, onChange }) => {
  const closeBtn = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="8" y1="8" x2="16" y2="16" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="#333" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );

  const plusBtn = () => (
    <svg className="ext-add-inputbox-plus-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="5" x2="12" y2="19" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="#333" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );

  const addRow = () => onChange([...value, { id: Date.now(), title: "" }]);

  const removeRow = (id: number) => onChange(value.filter((entry) => entry.id !== id));

  const changeTxt = (id: number, newTitle: string) => onChange(newTitle, id);

  const btnRow = (item: Entry) => (
    <div className="ext-add-content-row" key={item.id}>
      <div className="ext-add-content-row-bullet">&#8226;</div>
      <input
        id={`inputAddBox-${item.id}`}
        className="ext-addbox-input"
        type="text"
        placeholder="..."
        value={item.title}
        onChange={(e) => changeTxt(item.id, e.target.value)}
        spellCheck={false}
      />
      <div className="ext-addbox-textarea-tag-erase" onClick={() => removeRow(item.id)}>
        {closeBtn()}
      </div>
    </div>
  );

  return (
    <div className="ext-add-inputbox">
      <div className="ext-add-inputbox-title">
        <div className="ext-add-inputbox-title-txt">{title}</div>
        <div className="ext-add-inputbox-title-plus-wrapper">
          <div className="ext-add-inputbox-title-plus" onClick={addRow}>
            {plusBtn()}
          </div>
        </div>
      </div>
      <div className="ext-add-inputbox-body">{value.map((item) => btnRow(item))}</div>
    </div>
  );
};