# Toggle Pin Editor - Visual Studio Code Extension

This is a simple Visual Studio Code extension that adds a command to toggle the pinning of editor tabs.

⚠️ **Important Note**: As of VS Code's native features, you can now achieve the same pin/unpin toggle functionality without this extension using the following keyboard shortcut configuration in your `keybindings.json`:

```json
{
    "key": "ctrl+p",
    "command": "workbench.action.unpinEditor",
    "when": "activeEditorIsPinned"
},
{
    "key": "ctrl+p",
    "command": "workbench.action.pinEditor",
    "when": "!activeEditorIsPinned"
}
```

## Features

- Toggle pinning/unpinning of the active editor tab.
- Easily manage pinned tabs using a custom keyboard shortcut.

## Usage

1. Open a file in Visual Studio Code.
2. Use the registered command to toggle the pinning of the active editor tab. The extension does not automatically detect keyboard shortcuts.

   To use the command, you can:

   - Open the command palette by pressing `Ctrl+Shift+P`, then type "Open Keyboard Shortcuts" and select the command from the list.
   - Assign a custom keyboard shortcut.

   ```json
   [
     {
       "key": "ctrl+p",
       "command": "togglePinEditor.togglePinEditor"
     }
   ]
   ```

3. Save the file and you can use `ctrl+p` to toggle pin the text editor.

## Installation

You can install "Toggle Pin Editor" by following these steps:

1. Launch Visual Studio Code.

2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.

3. Search for "Toggle Pin Editor" and install it from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=MarcoAntonioMaderaLpez.toggle-pin-editor).

## Feedback and Contributions

If you have any issues, feature requests, or would like to contribute to this extension, please visit the [GitHub repository](https://github.com/MarcoMadera/toggle-pin-editor) for this project.

## License

This extension is licensed under the [MIT License](LICENSE.md).

---
