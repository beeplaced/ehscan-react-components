# ehscan-react-components

- Button
- Window
- TextArea

# Styling

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

# Window

## styling

| Variable                             | Default                       | Description                        |
| ------------------------------------ | ----------------------------- | ---------------------------------- |
| `--ext-window-bck-color`             | `white`                       | Window background color            |
| `--ext-window-width`                 | `400px`                       | Window default width               |
| `--ext-window-min-height`            | `300px`                       | Window minimum height              |
| `--ext-window-border-radius`         | `12px`                        | Window border radius               |
| `--ext-window-shadow`                | `rgba(50,50,93,0.25) ...`   | Box shadow for window              |
| `--ext-window-opacity`               | `0`                           | Initial opacity (used for fade-in) |
| `--ext-window-transition`            | `opacity 0.4s ease-in-out`    | Fade transition                    |
| `--ext-window-header-bck-color`      | `var(--ext-window-bck-color)` | Header background color            |
| `--ext-window-close-bck`             | `aqua`                        | Close button background            |
| `--ext-window-body-bck`              | `transparent`                 | Body background color              |
| `--ext-window-footer-bck`            | `transparent`                 | Footer background color            |
| `--ext-window-footer-min-height`     | `50px`                        | Footer min height                  |
| `--ext-window-scrollbar-thumb`       | `white`                       | Scrollbar thumb color              |
| `--ext-window-scrollbar-thumb-hover` | `#555`                        | Scrollbar thumb color on hover     |
| `--ext-window-resize-bck`            | `darkgreen`                   | Resize handle background           |

----
# Changelog

All notable changes to this project will be documented in this file.
---


## [1.0.5] - 2027-11-11
### Fixed
- Setter now supports functional update (like React’s setState)

## [1.0.4] - 2027-10-22
### Added
- Added UseClickSetter
  - Only Clicking purpose

## [1.0.3] - 2025-10-22
### Fixed
- Optimized listener notifications:
  - Only listeners subscribed to a changed or removed key are notified.
  - Previously, all listeners were notified on every state change.