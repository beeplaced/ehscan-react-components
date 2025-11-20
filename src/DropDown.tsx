import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";

export type DropDownHandle = {
    calc: () => void;
};

type DropDownProps = {
    openDropDown: boolean;
    display: string[];
    addItem: (index: number) => void;
    searchTerm: string;
    maxDropDownEntries?: number;
    maxDropDownHeight?: number;
};

export const DropDown = forwardRef<DropDownHandle, DropDownProps>(
    ({ openDropDown, display, addItem, searchTerm, maxDropDownEntries, maxDropDownHeight }, ref) => {
        const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 0 });
        const containerRef = useRef<HTMLDivElement>(null);
        const [tabId, setTabId] = useState<number | undefined>(undefined);
        const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

        useEffect(() => {
            if (!openDropDown || display.length === 0) return;

            const handleKeyDown = (e: KeyboardEvent) => {

                if (e.key === 'ArrowDown') {
                    setTabId(prevTabId => {
                        const next = prevTabId === undefined || prevTabId >= display.length - 1 ? 0 : prevTabId + 1;

                        // scroll into view
                        itemRefs.current[next]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                        });

                        return next;
                    });
                }

                if (e.key === 'ArrowUp') {
                    setTabId(prevTabId => {
                        const next = prevTabId === undefined || prevTabId <= 0 ? display.length - 1 : prevTabId - 1;
                        itemRefs.current[next]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                        });

                        return next;
                    });
                }

                if (e.key === "Enter" && tabId !== undefined) {
                    console.log('use', display[tabId])
                    addItem(tabId);
                    setTabId(prevTabId => {
  if (prevTabId === undefined) return 0
  if (display[prevTabId]) return prevTabId;
  if (display[prevTabId - 1]) return prevTabId - 1;
return 0;
});
                }

                // Add other keys here if needed
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown); // cleanup
            };
        }, [openDropDown, display, tabId]);

        useImperativeHandle(ref, () => ({
            calc: () => {
                console.log("calc");
                setTimeout(() => {
                    calcDropDown();
                }, 50);
            },
        }));

        type HighlightedTextProps = {
            text: string;
            searchTerm: string;
            maxLength?: number;
        };

        const HighlightedText: React.FC<HighlightedTextProps> = ({
            text,
            searchTerm,
            maxLength = 150
        }) => {
            if (!searchTerm) {
                const sliced = text.slice(0, maxLength);
                return (
                    <div>
                        {sliced}
                        {text.length > maxLength && '…'}
                    </div>
                );
            }
            const searchWords = searchTerm
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);

            if (searchWords.length === 0) {
                return <div>{text.slice(0, maxLength)}</div>;
            }

            const lowerText = text.toLowerCase();
            let firstMatchIndex = -1;
            for (let word of searchWords) {
                const index = lowerText.indexOf(word);
                if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
                    firstMatchIndex = index;
                }
            }
            let sliceStart = 0;
            let sliceEnd = maxLength;

            if (firstMatchIndex > -1) {

                const foundWord = searchWords.find(w => lowerText.includes(w));

                if (firstMatchIndex > -1 && foundWord) {
                    const matchEnd = firstMatchIndex + foundWord.length;
                    if (matchEnd > maxLength) {
                        sliceEnd = Math.min(text.length, matchEnd);
                        sliceStart = sliceEnd - maxLength;
                    }
                }
            }

            const displayText = text.slice(sliceStart, sliceEnd);
            const highlightRegex = new RegExp(`(${searchWords.join('|')})`, 'gi');
            const parts = displayText.split(highlightRegex);

            return (<>
                {sliceStart > 0 && '…'}
                {parts.map((part, i) =>
                    searchWords.includes(part.toLowerCase()) ? (
                        <span className="highlight-words" key={i}>{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
                {sliceEnd < text.length && '…'}
            </>
            );
        }

        const calcDropDown = () => {
            if (!containerRef?.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const distanceToBottom = window.innerHeight - rect.bottom;
            setPosition({
                top: rect.bottom - 10,
                left: rect.left,
                width: rect.width,
                maxHeight: maxDropDownHeight || distanceToBottom - 50
            });
        }

        useEffect(() => {
            if (openDropDown && containerRef.current) {
                calcDropDown()
            };
        }, [openDropDown]);



        const addDropDownItem = (index: number) => {
            addItem(index);
            setTimeout(() => {
                calcDropDown();
            }, 50);
        }

        return (
            <>
                <div className="ext-window-dropdown-edge" ref={containerRef} />
                {openDropDown && display.length > 0 && (
                    <div className="ext-window-dropdown"
                        style={{
                            top: position.top,
                            left: position.left,
                            width: position.width
                        }}>
                        {maxDropDownEntries !== undefined && (
                            <div className="dropdown-amount-row">
                                {display.length} / {maxDropDownEntries} entries
                            </div>
                        )}
                        <div className="ext-window-dropdown-wrapper _ewb" style={{ maxHeight: `${position.maxHeight}px`, }}>
                            {display.map((item, index: number) => (
                                <div key={index}
                                    ref={el => { itemRefs.current[index] = el }}
                                    className={`dropdown-item ${index === tabId ? 'focused' : ''}`}
                                    tabIndex={0} // makes it focusable via keyboard
                                    onClick={() => addDropDownItem(index)}
                                    onFocus={() => setTabId(index)}>
                                    <HighlightedText text={item} searchTerm={searchTerm} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    })