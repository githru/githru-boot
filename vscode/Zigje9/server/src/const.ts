import { CompletionItem, CompletionItemKind } from "vscode-languageserver/node";

export const completionItemInfos: CompletionItem[] = [
  {
    label: "githru",
    kind: CompletionItemKind.Text,
    detail:
      "Visual Analytics for Understanding Software Development History Through Git Metadata Analysis",
    documentation: "https://github.com/githru",
  },
  {
    label: "githru-boot",
    kind: CompletionItemKind.Text,
    detail: "Welcome to githru-boot!",
    documentation: "https://github.com/githru/githru-boot",
  },
  {
    label: "githru-vscode-ext",
    kind: CompletionItemKind.Text,
    detail: "Lightweight but robust Githru for VSCode Extension",
    documentation: "https://github.com/githru/githru-vscode-ext",
  },
  {
    label: "zigje9",
    kind: CompletionItemKind.Text,
    detail: "Front-end engineer",
    documentation: "https://github.com/zigje9",
  },
];
