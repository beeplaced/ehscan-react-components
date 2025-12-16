# ehscan-react-components

A lightweight, modular collection of reusable React UI components designed for modern applications.
All components are built with TypeScript, React, and Vite and css modules. Its focused on flexibility, performance, and ease of integration.
This library is ideal for dashboards, admin panels, internal tools, and feature-rich web apps.

## 📦 Available Components

## Table of Contents
- [Button](#button)
- [Drag And Drop](#drag-and-drop)
- [AddBox](#addbox)
- [Window](#window)

- Input
  - textarea
  - TextAreaDropDown

- Text or Content Elements
  - TextElementStretch
  - FoldedElement

## Installation

```bash
npm ehscan-react-components
# or
yarn add ehscan-react-components
```

# Usage Examples

## Button

A flexible, reusable button component for React with support for multiple interaction styles like raw, pop, and ripple effects.

Features:

- **Optional text and icon support**: You can pass text and/or children (e.g., an icon) to display inside the button.
- **Multiple button styles**: Controlled via the type prop:
  - "raw": Standard button with no extra visual effect.
  - "pop": Shrinks slightly when pressed, creating a “pop” effect.
  - "ripple": Shows a ripple animation on click.
- **Click handling with optional delay**: The click callback is triggered on button press, with an optional 200ms delay unless notimeout is true.
- **Custom styling**: You can pass additional classes via addClass.
- **Accessibility support**: Uses aria-pressed to indicate a selected state.

![Button Preview](https://raw.githubusercontent.com/beeplaced/ehscan-react-components/main/src/images/Button.png)

```jsx
import { Button } from 'ehscan-react-components';

const ButtonPage = () => {

  const doStuff = () => {
    console.log("doStuff")
  }

  return (<>
      <Button index={'primary'} text='Primary' type="pop" addClass="inject-styling" click={() => doStuff()} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
      </Button>
      <Button index={'danger'} text='Danger' type="pop" addClass="ext-btn--danger" click={() => doStuff()} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></svg>
      </Button>
      <Button index={'secondary'} text='Secondary' type="pop" addClass="ext-btn--secondary" click={() => doStuff()} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M360-160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm220 40q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm140 0q17 0 28.5-11.5T580-480q0-17-11.5-28.5T540-520q-17 0-28.5 11.5T500-480q0 17 11.5 28.5T540-440Zm140 0q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-100-40Z" /></svg>
      </Button>
  </>)
}

```
### Styling
```css
.inject-styling {
  /* Spacing & layout */
  --ext-btn-gap: 0.5rem;
  --ext-btn-padding: 5px 10px 5px 5px;
  --ext-btn-width: fit-content;
  --ext-btn-height: auto;

  /* Typography */
  --ext-btn-font-size: 1rem;
  --ext-btn-font-weight: 500;
  --ext-btn-color: #fff;
  --ext-btn-colorbtn-line-height: 1.5;
  --ext-btn-font-family: inherit;

  /* Background & color */
  --ext-btn-bg: #007aff;
  --ext-btn-color: #fff;

  /* Border & radius */
  --ext-btn-border: none;
  --ext-btn-radius: 18px;

  /* Effects & transitions */
  --ext-btn-transition: all 0.2s ease;
  --ext-btn-pop-scale: 0.95;
  --ripple-box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
}
```

## Drag And Drop

A fully interactive drag-and-drop list component built with React that allows users to reorder items, select items, and handle autosave or custom callbacks.

Features:

- **Drag & drop reordering** 
  - Users can click and drag any item in the list to reorder it.
  - A “ghost” of the dragged item follows the cursor while dragging.
  - Items swap positions when dropped, and the updated order is saved.
- **Selection support**
  - Clicking an item toggles its selected state.
  - Selected items can be highlighted using a CSS class (styles.selected).
- **Custom callbacks & autosave**
  - setItems: Updates the parent state with the new item order.
  - changeItemsAction: A callback fired whenever items are reordered or clicked.
  - Debounced autosave: Changes are automatically saved with a delay (debounce) to reduce rapid API calls.
- **Pop effect on drop**
  - When an item is dropped into a new position, it briefly triggers a “pop” animation to indicate the change.
- **Accessibility & flexibility**
  - Works with any list of objects that have an id and label.
  - Each item can optionally have a selected property.
  - The component is fully type-safe with TypeScript.

![DND Preview](https://raw.githubusercontent.com/beeplaced/ehscan-react-components/main/src/images/DND.png)

```jsx
import { DragAndDrop } from 'ehscan-react-components';

const DND = () => {

    const [items, setItems] = useState([
        { id: 1, label: "title" },
        { id: 2, label: "description" },
        { id: 3, label: "category" },
        ...
        { id: 10, label: "thumbnail" }
    ]
    );

    const changeItemsAction = (colums) => {
        console.log(colums)
    };

    return (<>
    <div classname="dnd-css-inject">
      <DragAndDrop items={items} setItems={setItems} changeItemsAction={changeItemsAction} />
      </div>
    </>) 
} 

```
<!-- IMAGE -->

### Styling
```css
/* Customize Drag & Drop component */
.dnd-css-inject {
  /* List Item */
  --ext-dnd-item-bck-clr: darkblue;
  --ext-dnd-item-border-radius: 4px;
  --ext-dnd-item-padding: 10px;
  --ext-dnd-item-clr: white;
  --ext-dnd-item-height: 40px;

  /* Selected Item */
  --ext-dnd-item-selected-bck-clr: darkviolet;

  /* Hovered Item */
  --ext-dnd-item-selected-bck-hvr-clr: darkgreen;

  /* Drag Handle */
  --ext-dnd-item-handle-clr: #6c8cff;

  /* SVG */
  --ext-dnd-svg-width: 30px;
  --ext-dnd-svg-height: 30px;
  --ext-dnd-svg-fill: white;
  --ext-dnd-svg-fill-check: lightslategrey;

  /* Ghost Item (dragging) */
  --ext-dnd-item-ghost-padding: 10px;
  --ext-dnd-item-ghost-bck-clr: white;
  --ext-dnd-item-ghost-border: 1px solid #6c8cff;
  --ext-dnd-item-ghost-clr: lightslategrey;
  --ext-dnd-item-ghost-border-radius: 6px;
}
```

## AddBox

AddBox is a React component for managing a list of entries. It allows users to add, edit, and remove rows dynamically. Each row has an id and a title.
The component is fully controlled — the parent manages the state and receives updates via the onChange callback.

![AddBox Preview](https://raw.githubusercontent.com/beeplaced/ehscan-react-components/main/src/images/AddBox.png)

```jsx
import { useEffect, useState } from "react";
import { AddBox, useChangeAddBox } from 'ehscan-react-components';

const Elements = () => {

    const [inValue, setInValue] = useState({
    add: [
      { id: 0, title: "first Entry" },
      { id: 1, title: "second Entry" },
      { id: 2, title: "last Entry" }
    ]
  });

  useEffect(() => {
    console.log(inValue); //use ValueChanges on save
  },[inValue])

  const changeAddBox = useChangeAddBox(inValue, setInValue, "add"); //change on specific tag

  return (
    <>
      <div className="element-wrapper"> {/* ✏️ Put custom styling overrides here */}
      <AddBox title="Element-Title" value={inValue.add} onChange={(value, id) => changeAddBox(value, id)} />
      </div>
    </>
  );
}

export default Elements;
```

### Styling

CSS Variables for AddBox

| Variable                                        | Default               | Applies To / Description                       |
| ----------------------------------------------- | --------------------- | ---------------------------------------------- |
| `--ext-add-inputbox-border-radius`              | `10px`                | Border radius of the outer AddBox container    |
| `--ext-add-inputbox-border`                     | `2px solid white`     | Border of the AddBox container                 |
| `--ext-add-inputbox-title-top`                  | `-15px`               | Top position of the title row                  |
| `--ext-add-inputbox-plus-svg-stroke`            | `white`               | Stroke color of the “plus” SVG lines           |
| `--ext-add-inputbox-plus-svg-strokeWidth`       | `3`                   | Stroke width of the “plus” SVG lines           |
| `--ext-add-inputbox-plus-bck-clr`               | `lightblue`           | Background color of the plus-wrapper container |
| `--ext-add-inputbox-plus-padding`               | `7px`                 | Horizontal padding inside plus-wrapper         |
| `--ext-add-inputbox-title-plus-margin-right`    | `15px`                | Margin-right of the plus wrapper               |
| `--ext-add-inputbox-title-plus-bck-clr`         | `transparent`         | Background color of the plus button            |
| `--ext-add-inputbox-title-plus-border-radius`   | `50px`                | Border radius of the plus button               |
| `--ext-add-inputbox-title-plus-h`               | `25px`                | Height of the plus button                      |
| `--ext-add-inputbox-title-plus-w`               | `25px`                | Width of the plus button                       |
| `--ext-add-inputbox-title-plus-border`          | `2px solid white`     | Border of the plus button                      |
| `--ext-add-inputbox-title-plus-bck-clr-hvr`     | `lightgray`           | Background color of plus button on hover       |
| `--ext-add-inputbox-txt-margin-left`            | `10px`                | Margin-left of the title text                  |
| `--ext-add-inputbox-txt-bck-clr`                | `lightblue`           | Background color of the title text             |
| `--ext-add-inputbox-txt-clr`                    | `black`               | Text color of the title text                   |
| `--ext-add-inputbox-txt-plus-h`                 | `20px`                | Height of the title text container             |
| `--ext-add-inputbox-body-padding`               | `20px 10px 10px 10px` | Padding for the AddBox body                    |
| `--ext-add-content-row-height`                  | `30px`                | Height of each row in the AddBox               |
| `--ext-add-content-row-bck-clr`                 | `white`               | Background color of each row                   |
| `--ext-add-content-row-border-radius`           | `50px`                | Border radius of each row                      |
| `--ext-add-content-row-hover-bck-clr`           | `whitesmoke`          | Background color of row on hover               |
| `--tag-erase-w`                                 | `25px`                | Width of the row delete button                 |
| `--tag-erase-h`                                 | `25px`                | Height of the row delete button                |
| `--ext-addbox-textarea-tag-erase-hover-bck-clr` | `darkgray`            | Background color of the delete button on hover |
| `--ext-addbox-input-focus-border`               | `1px dashed darkgrey` | Border of the input on focus                   |

## Window
```jsx
import { useEffect, useState } from "react";
import { Window } from 'ehscan-react-components';

const WindowWrapper = ({ windowOpen, setWindowOpen }) => {
    const [closeCommand, setCloseCommand] = useState(undefined);

    return (<>
        <div className="inject-window-css">
            <Window trackMove={(entry) => setCloseCommand(entry)} open={windowOpen}
                header={
                    <div className="window-header">
                        <div className="window-header-title _txt">My Window Header Title</div>
                    </div>
                }
                body={
                    <div className="window-body-wrapper">My Window Body</div>
                }
                footer={
                    <div className="window-footer">My Window Footer</div>
                }
            />
        </div>
    </>)
}

```

### Styling
```css

.inject-window-css {
  /* Window container */
  --ext-window-bck-color: white;
  --ext-window-width: 400px;
  --ext-window-min-height: 300px;
  --ext-window-border-radius: 12px;
  --ext-window-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  --ext-window-opacity: 0;
  --ext-window-transition: opacity 0.4s ease-in-out;

  /* Header */
  --ext-window-header-bck-color: transparent;
  --ext-window-header-height: 50px;

  /* Body */
  --ext-window-body-bck: transparent;

  /* Footer */
  --ext-window-footer-bck: transparent;
  --ext-window-footer-height: 50px;

  /* Scrollbars */
  --ext-window-scrollbar-thumb: white;
  --ext-window-scrollbar-thumb-hover: #555;

  /* Resize handle */
  --ext-window-resize-bck: darkgrey;
}
```
----
# Changelog


## [0.1.53] - 2025-12-16
- Added FoldedElement

## [0.1.51] - 2025-12-16
- Added TextElementStretch

## [0.1.50] - 2025-12-16
- Button default style adjustments

## [0.1.49] - 2025-12-12
- Image and docu for Drag and Drop

## [0.1.48] - 2025-12-12
- Improved Button, module styling and docu, mobile usage (type: "pop")
- Ripple module styling

## [0.1.45] - 2025-12-11
- Added Drag And Drop Component
- Added Window css module and docu
