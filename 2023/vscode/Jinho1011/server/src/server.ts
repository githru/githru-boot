import {
  createConnection,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocuments,
  TextDocumentSyncKind,
  Diagnostic,
  DiagnosticSeverity,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import isValidFileName from "./utils/fileNameValidator";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
  connection.console.log("server has started!");

  const result: InitializeResult = {
    capabilities: {
      // language server에서 제공하려는 기능을 작성합니다.
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_synchronization_sc
      // language server와 문서가 동기화되는 방식을 Incremental로 정의합니다.
      // Incremental은 문서가 열릴 때 동기화를 하고 이후 변경에 대해서는 변경된 부분에 대해서만 전달된다는 의미입니다.
    },
  };

  return result;
});

documents.onDidChangeContent((change) => {
  const diagnostics: Diagnostic[] = [];
  change.document
    .getText()
    .split("\n")
    .forEach((line, lineNumber) => {
      if (line.split("/").some((fileName) => !isValidFileName(fileName))) {
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: lineNumber, character: 0 },
            end: { line: lineNumber, character: line.length },
          },
          message: `invalid filename included`,
        };
        diagnostics.push(diagnostic);
      }
    });
  connection.sendDiagnostics({ uri: change.document.uri, diagnostics });
});

documents.listen(connection);
connection.listen();
