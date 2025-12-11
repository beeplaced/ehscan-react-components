import React from 'react';
import styles from '../style/dnd.module.css';
import ChecklistItemSquare from "./ChecklistItemSquare";

type DragItemData = {
  id: number | string;
  label: string;
  selected?: boolean;
};

type DragItemProps = {
  item: DragItemData;
  click: (id: number | string) => void;
};

const DragItem: React.FC<DragItemProps> = ({ item, click }) => {
  const selected = item.selected ?? false;

  return (
    <div className={styles.itemBody}>
      <div className={styles.dndSelect} onClick={() => click(item.id)}>
        <ChecklistItemSquare checked={selected} />
      </div>
      <div>{item.label}</div>
    </div>
  );
};

export default DragItem;