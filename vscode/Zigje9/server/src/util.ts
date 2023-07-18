import { CompletionItem } from "vscode-languageserver/node";
import { completionItemInfos } from "./const";

export const getCompletionItems = (): CompletionItem[] => {
  return completionItemInfos;
};
