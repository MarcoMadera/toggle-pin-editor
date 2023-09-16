import * as assert from "assert";
import * as vscode from "vscode";
import { activate } from "../../extension";

suite("Extension Tests", function () {
  test("should toggle pin the active editor", async () => {
    let calledCommand;
    const originalExecuteCommand = vscode.commands.executeCommand;

    vscode.commands.executeCommand = function (command: string) {
      calledCommand = command;
      originalExecuteCommand(command);
    } as any;

    const extensionContext = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    Object.defineProperty(vscode.window, "activeTextEditor", {
      get: () =>
        ({
          document: {
            uri: {
              toString: () => "file://test",
            },
          },
        } as any),
    });
    activate(extensionContext);

    await vscode.commands.executeCommand("extension.togglePinEditor");

    assert.strictEqual(calledCommand, "workbench.action.pinEditor");

    await vscode.commands.executeCommand("extension.togglePinEditor");

    assert.strictEqual(calledCommand, "workbench.action.unpinEditor");
  });
});
