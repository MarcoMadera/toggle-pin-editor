import * as vscode from "vscode";

export const disposable = vscode.commands.registerCommand(
  "togglePinEditor.togglePinEditor",
  () => {
    const isPinned = vscode.window.tabGroups.activeTabGroup.activeTab?.isPinned;
    if (isPinned) {
      vscode.commands.executeCommand("workbench.action.unpinEditor");
    } else {
      vscode.commands.executeCommand("workbench.action.pinEditor");
    }
  }
);

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(disposable);
}
