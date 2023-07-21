import * as vscode from "vscode";
import { TreeItem, TreeItemCollapsibleState } from "vscode";

export class Clipboard extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.contextValue = "clipHistoryItem:";
  }
}

export class ClipboardProvider implements vscode.TreeDataProvider<Clipboard> {
  constructor(public readonly clipboardList: Clipboard[]) {
    this.clipboardList = clipboardList;
  }

  getTreeItem(element: Clipboard): TreeItem {
    return element;
  }

  getChildren(): Thenable<Clipboard[]> {
    const temp = Object.assign([], this.clipboardList);
    return Promise.resolve(temp.reverse());
  }
}
