import * as vscode from "vscode";
const pinnedTabs: Map<string, boolean> = new Map();

export const disposable = vscode.commands.registerCommand(
  "extension.togglePinEditor",
  () => {
    const editor = vscode.window.activeTextEditor;
    const filePath = editor?.document.uri.toString();
    const isPinned = pinnedTabs.get(filePath ?? "") ?? false;
    if (isPinned) {
      vscode.commands.executeCommand("workbench.action.unpinEditor");
      if (filePath) {
        pinnedTabs.delete(filePath);
      }
    } else {
      vscode.commands.executeCommand("workbench.action.pinEditor");
      if (filePath) {
        pinnedTabs.set(filePath, true);
      }
    }
  }
);

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(disposable);
}
