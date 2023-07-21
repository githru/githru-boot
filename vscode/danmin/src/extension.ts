import * as vscode from "vscode";
import { registerCommands } from "./utils";

export const activate = () => {
  vscode.workspace.onDidChangeConfiguration((event) => {
    let affected = event.affectsConfiguration("clipboard.maximumClips");
    if (!affected) return;

    const config = vscode.workspace.getConfiguration("clipboard");
    config.update("maximumClips", 200);
  });

  registerCommands();
};

export const deactivate = () => {};
