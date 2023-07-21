import * as vscode from "vscode";
import { commands, TreeItem, TreeItemCollapsibleState, window } from "vscode";
import { Clipboard, ClipboardProvider } from "./types";

const commandsMap = {
  copy: {
    register: "clipboard.copy",
    execute: "editor.action.clipboardCopyAction",
    message: "copy!",
  },
  cut: {
    register: "clipboard.cut",
    execute: "editor.action.clipboardCutAction",
    message: "cut!",
  },
  paste: {
    register: "clipboard.pasteFromClipboard",
    message: "pasteFromClipboard!",
  },
  history: {
    copy: {
      register: "clipboard.history.copy",
      message: "copied in history!",
    },
    remove: {
      register: "clipboard.history.remove",
      message: "removed in history!",
    },
  },
};

export const registerCommands = () => {
  let clipboardList: Clipboard[] = [];

  const config = vscode.workspace.getConfiguration("clipboard");
  let maximumClips = config.get("maximumClips", 200);

  const createTreeView = async () => {
    vscode.window.createTreeView("clipboard.history", {
      treeDataProvider: new ClipboardProvider(clipboardList),
    });
  };

  const addClipboardItem = async () => {
    let copied = await vscode.env.clipboard.readText();
    copied = copied.replace(/\n/gi, "↵");

    const item: Clipboard = new Clipboard(
      copied,
      TreeItemCollapsibleState.None
    );

    if (clipboardList.find((c) => c.label === copied)) {
      clipboardList = clipboardList.filter((c) => c.label !== copied);
    }

    clipboardList.push(item);
    if (maximumClips > 0) {
      clipboardList = clipboardList.reverse().slice(0, maximumClips).reverse();
    }
  };

  commands.registerCommand(commandsMap.copy.register, () => {
    commands.executeCommand(commandsMap.copy.execute).then(() => {
      addClipboardItem().then(() => {
        window.setStatusBarMessage(commandsMap.copy.message);
        createTreeView();
      });
    });
  });

  commands.registerCommand(commandsMap.cut.register, () => {
    commands.executeCommand(commandsMap.cut.execute).then(() => {
      addClipboardItem().then(() => {
        window.setStatusBarMessage(commandsMap.cut.message);
        createTreeView();
      });
    });
  });

  commands.registerCommand(commandsMap.paste.register, () => {
    window.setStatusBarMessage(commandsMap.paste.message);
    createTreeView();

    const items = clipboardList
      .map((c) => {
        return {
          label: c.label,
          description: "",
        };
      })
      .reverse();

    window.showQuickPick(items).then((item) => {
      const label = ((item as vscode.QuickPickItem).label as string).replace(
        /↵/gi,
        "\n"
      );
      vscode.env.clipboard.writeText(label).then(() => {
        if (!!window.activeTextEditor) {
          const editor = window.activeTextEditor;
          editor
            .edit((textInserter) => textInserter.delete(editor.selection))
            .then(() => {
              editor.edit((textInserter) =>
                textInserter.insert(editor.selection.start, label)
              );
            });
        }
      });
    });
  });

  vscode.commands.registerCommand(
    commandsMap.history.copy.register,
    (item: TreeItem) => {
      const label = (item.label as string).replace(/↵/gi, "\n");
      vscode.env.clipboard.writeText(label).then(() => {
        window.setStatusBarMessage(commandsMap.history.copy.message);
      });
    }
  );

  vscode.commands.registerCommand(
    commandsMap.history.remove.register,
    (item: TreeItem) => {
      clipboardList = clipboardList.filter((c) => c.label !== item.label);
      createTreeView();
      window.setStatusBarMessage(commandsMap.history.remove.message);
    }
  );
};
