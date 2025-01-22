import * as assert from "assert";
import * as vscode from "vscode";
import { activate } from "../../extension";

async function waitForEditorChange(): Promise<void> {
  return new Promise((resolve) => {
    const disposable = vscode.window.onDidChangeActiveTextEditor(() => {
      disposable.dispose();
      resolve();
    });
  });
}

async function waitForTabChange(): Promise<void> {
  return new Promise((resolve) => {
    const disposable = vscode.window.tabGroups.onDidChangeTabs(() => {
      disposable.dispose();
      resolve();
    });
  });
}

suite("Extension Tests", function () {
  test("should toggle pin the active editor", async () => {
    const document = await vscode.workspace.openTextDocument({
      content: "Test content",
      language: "plaintext",
    });

    const editorChangePromise = waitForEditorChange();
    await vscode.window.showTextDocument(document);
    await editorChangePromise;

    assert.ok(vscode.window.activeTextEditor, "No active editor");

    let calledCommand;
    const originalExecuteCommand = vscode.commands.executeCommand;
    vscode.commands.executeCommand = async function (command: string) {
      calledCommand = command;
      return originalExecuteCommand(command);
    } as any;

    const extensionContext = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    activate(extensionContext);

    const waitForTabChangeProm = waitForTabChange();
    await vscode.commands.executeCommand("togglePinEditor.togglePinEditor");
    await waitForTabChangeProm;

    assert.strictEqual(calledCommand, "workbench.action.pinEditor");
    assert.strictEqual(
      vscode.window.tabGroups.activeTabGroup.activeTab?.isPinned,
      true,
      "Tab should be pinned after first toggle"
    );

    const waitForTabChangeProm2 = waitForTabChange();
    await vscode.commands.executeCommand("togglePinEditor.togglePinEditor");
    await waitForTabChangeProm2;

    assert.strictEqual(calledCommand, "workbench.action.unpinEditor");
    assert.strictEqual(
      vscode.window.tabGroups.activeTabGroup.activeTab?.isPinned,
      false,
      "Tab should be unpinned after second toggle"
    );
  });
});
