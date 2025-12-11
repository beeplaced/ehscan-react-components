# ehscan-react-components

A lightweight, modular collection of reusable React UI components designed for modern applications.
All components are built with TypeScript, React, and Vite and css modules. Its focused on flexibility, performance, and ease of integration.
This library is ideal for dashboards, admin panels, internal tools, and feature-rich web apps.

## 📦 Available Components

## Table of Contents
- [Drag And Drop](#drag-and-drop)
- [AddBox](#addbox)
- [Window](#window)
- Button
- textarea
- TextAreaDropDown

## Installation

```bash
npm ehscan-react-components
# or
yarn add ehscan-react-components
```

# Usage Examples

## Drag And Drop

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


# Styling

- TextAreaDropDown

| Variable                           | Fallback / Default                  |
| ---------------------------------- | ----------------------------------- |
| `--ext-textarea-box-bck-clr`       | `lightgray`                         |
| `--ext-textarea-box-border-radius` | `10px`                              |
| `--ext-dropdown-border-radius`     | `20px`                              |
| `--input-txt-size`                 | *(not explicitly set, optional)*    |
| `--d-font-weight`                  | *(not explicitly set, optional)*    |
| `--input-clr`                      | `black`                             |
| `--textarea-tag-bck-clr`           | `white` (some places `transparent`) |
| `--textarea-tag-clr`               | `darkblue` (some places `white`)    |
| `--d-input-placeholder-clr`        | `black`                             |
| `--d-input-bck-clr`                | `transparent`                       |
| `--dropdown-item-bck-clr`          | `wheat`                             |
| `--dropdown-amount-row-bck-clr`    | `yellow`                            |
| `--animate-s`                      | `.5s`                               |


## Base Button Variables

| Variable              | Default/Fallback                          |
| --------------------- | ----------------------------------------- |
| `--btn-bg`            | `#007aff`                                 |
| `--btn-color`         | `#fff`                                    |
| `--btn-radius`        | `18px`                                    |
| `--btn-padding-y`     | `0.5rem`                                  |
| `--btn-padding-x`     | `1rem`                                    |
| `--btn-width`         | `fit-content`                             |
| `--btn-height`        | `auto`                                    |
| `--btn-font-size`     | `1rem`                                    |
| `--btn-font-weight`   | `500`                                     |
| `--btn-transition`    | `all 0.2s ease`                           |
| `--btn-line-height`   | `1.5`                                     |
| `--ripple-box-shadow` | `rgb(100 100 111 / 20%) 0px 7px 29px 0px` |
| `--ripple-effect-bck` | `rgb(0 0 0 / 15%)`                        |


### Size-specific overrides

| Variable             | Size | Default/Fallback |
| -------------------- | ---- | ---------------- |
| `--btn-padding-y-sm` | sm   | `0.25rem`        |
| `--btn-padding-x-sm` | sm   | `0.75rem`        |
| `--btn-font-size-sm` | sm   | `0.85rem`        |
| `--btn-padding-y-md` | md   | `0.5rem`         |
| `--btn-padding-x-md` | md   | `1rem`           |
| `--btn-font-size-md` | md   | `1rem`           |
| `--btn-padding-y-lg` | lg   | `0.75rem`        |
| `--btn-padding-x-lg` | lg   | `1.5rem`         |
| `--btn-font-size-lg` | lg   | `1.1rem`         |

### Variant-specific variables

| Variable                | Variant   | Default/Fallback |
| ----------------------- | --------- | ---------------- |
| `--btn-bg-primary`      | primary   | `#007aff`        |
| `--btn-color-primary`   | primary   | `#fff`           |
| `--btn-bg-secondary`    | secondary | `#e5e5ea`        |
| `--btn-color-secondary` | secondary | `#111`           |
| `--btn-bg-outline`      | outline   | `transparent`    |
| `--btn-color-outline`   | outline   | `#007aff`        |
| `--btn-bg-ghost`        | ghost     | `transparent`    |
| `--btn-color-ghost`     | ghost     | `#007aff`        |
| `--btn-bg-danger`       | danger    | `#ff3b30`        |
| `--btn-color-danger`    | danger    | `#fff`           |

### Specific Button Types

| Variable                | Type     | Default/Fallback |
| ----------------------- | -------- | ---------------- |
| `--btn-width-close`     | closeBtn | `35px`           |
| `--btn-height-close`    | closeBtn | `35px`           |
| `--btn-bg-close`        | closeBtn | `lightgray`      |
| `--btn-height-save`     | saveBtn  | `35px`           |
| `--btn-padding-x-save`  | saveBtn  | `30px`           |
| `--btn-bg-save`         | saveBtn  | `#007aff`        |
| `--btn-height-trash`    | trashBtn | `35px`           |
| `--btn-padding-x-trash` | trashBtn | `10px`           |
| `--btn-radius-trash`    | trashBtn | `4px`            |
| `--btn-bg-trash`        | trashBtn | `lightgray`      |

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

## [0.1.45] - 2025-12-11
- Added Drag And Drop Component
- Added Window css module and docu
---
