import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "lsp" is now active!');

  const disposable = vscode.commands.registerCommand("lsp.test", () => {
    vscode.window.showInformationMessage("Testing LSP");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
