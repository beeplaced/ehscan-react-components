import React, { useState, useRef, useEffect } from 'react';
import styles from '../style/dnd.module.css';
import DragItem from './DragItem';
import { debounce } from "../tools/Debounce";

interface Item {
    id: number;
    label: string;
    selected?: boolean;
}

interface Props {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    changeItemsAction: (updatedItems: Item[]) => void; // add this
}

export const DragAndDrop: React.FC<Props> = ({ items, setItems, changeItemsAction }) => {
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [popItem, setPopItem] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const draggingIndexRef = useRef<number | null>(null);
    const hoverIndexRef = useRef<number | null>(null);

    useEffect(() => {
        console.log(hoverIndexRef.current, draggingIndexRef.current)
    }, [draggingIndexRef, hoverIndexRef])

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const el = document.getElementById(`item-${index}`);
        if (!el) return
        const rect = el.getBoundingClientRect();

        draggingIndexRef.current = index;

        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setDragPosition({
            x: rect.left,
            y: rect.top,
        });

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
        setDragPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
        });

        const container = containerRef.current;
        if (!container) return;

        const rects = Array.from(container.children)
            .filter((_, idx) => idx !== draggingIndexRef.current) // skip placeholder
            .map((child) => (child as HTMLElement).getBoundingClientRect());

        const mouseY = e.clientY;
        let newHoverIndex = items.length - 1; // default to last

        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (mouseY < r.top + r.height / 2) {
                newHoverIndex = i;
                break;
            }
        }

        if (newHoverIndex !== hoverIndexRef.current) hoverIndexRef.current = newHoverIndex;
    };

    const onMouseUp = () => {
        if (
            draggingIndexRef.current !== null &&
            hoverIndexRef.current !== null &&
            draggingIndexRef.current !== hoverIndexRef.current
        ) {
            const copy = [...items];
            const dragged = copy[draggingIndexRef.current];
            copy[draggingIndexRef.current] = copy[hoverIndexRef.current];
            copy[hoverIndexRef.current] = dragged;
            setItems(copy);
            changeItemsAction(copy);
            debouncedSave.current(copy); // your existing debounce
        }
        setPopItem(hoverIndexRef.current)
        draggingIndexRef.current = null;
        hoverIndexRef.current = null;
        setDragPosition({ x: 0, y: 0 });
        setTimeout(() => { setPopItem(null) }, 300)

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    };

    const debouncedSave = useRef(
        debounce((copy) => {
            const doSave = async () => {
                try {
                    await fixRows(copy);
                } catch (err) {
                    console.error('Autosave failed:', err);
                }
            };
            doSave();
        }, 800)
    );

    const fixRows = async (copy: Item[]) => {
        const sortedCopy = [...copy]
            .map(item => ({
                ...item,
                selected: !!item.selected, // ensure all items have boolean selected
            }))
            .sort((a, b) => Number(b.selected) - Number(a.selected));
        setItems(sortedCopy);
    }

    const clickDragItem = (targetId: number | string) => {
        const copy = items.map(item => item.id === targetId ? { ...item, selected: !item.selected } : item);
        setItems(copy);
        changeItemsAction(copy);
        debouncedSave.current(copy); // your existing debounce
    }

    if (!items) return null;

    return (
        <div ref={containerRef}
            className={styles.dndcontainer} >
            {items.map((item, index) => {
                const isPoping = index === popItem
                const isDragging = index === draggingIndexRef.current;
                return (
                    <div key={item.id} style={{ width: "100%" }}>
                        <div id={`item-${index}`}
                            className={`${styles.listItem} ${isDragging ? styles.placeholder : ''} ${hoverIndexRef.current === index ? styles.hovered : ''} ${isPoping ? styles.pop : ''} ${item.selected ? styles.selected : ''}`}>
                            <div className={styles.dragHandle} onMouseDown={(e) => onMouseDown(e, index)}>
                                ⠿
                            </div>
                            <DragItem item={item} click={clickDragItem} />
                        </div>
                    </div>
                );
            })}
            {draggingIndexRef.current !== null && (
                <div className={styles.dragGhost}
                    style={{
                        top: dragPosition.y,
                        left: dragPosition.x,
                        position: "fixed",
                    }}>
                    {items[draggingIndexRef.current].label}
                </div>
            )}
        </div>
    );
}