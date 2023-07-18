import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
  TextDocumentPositionParams,
  Diagnostic,
  DiagnosticSeverity,
  InitializeParams,
  InitializeResult,
  CompletionItemKind,
  CompletionItem,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents = new TextDocuments(TextDocument);

let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: true,
      },
    },
  };

  return result;
});
// The content of a text document has changed. This event is exmitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
  validateTextDocument(change.document);
});

const validateTextDocument = async (textDocument: TextDocument) => {
  const diagnostics: Diagnostic[] = [];
  textDocument
    .getText()
    .split('\n')
    .forEach((text, line) => {
      const trimmedText = text.trim();
      if (trimmedText.length === 0) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: {
            start: { line, character: 0 },
            end: { line, character: text.length },
          },
          message: 'sentence is empty.',
        });
        return;
      }
      if (!checkIsStartWithEmoji(text)) {
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line, character: 0 },
            end: { line, character: text.length },
          },
          message: `sentence is not started with emoji!!!😵`,
        };
        if (hasDiagnosticRelatedInformationCapability)
          diagnostic.relatedInformation = [
            {
              location: {
                uri: textDocument.uri,
                range: { ...diagnostic.range },
              },
              message: 'sentence syntax error',
            },
          ];
        diagnostics.push(diagnostic);
      }
    });

  // Send the computed diagnostics to VSCode.
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
};

const checkIsStartWithEmoji = (text: string) => {
  const emojiRegex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  return emojiRegex.test(text.trim());
};

// This handler provides the initial list of the completion items.
connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  const textDocument = documents.get(textDocumentPosition.textDocument.uri)?.getText();
  const { character } = textDocumentPosition.position;

  return (textDocument && !checkIsStartWithEmoji(textDocument)) || character === 0
    ? [
        {
          label: '📌 Notice',
          kind: CompletionItemKind.Text,
          data: 1,
        },
        {
          label: '👣 History',
          kind: CompletionItemKind.Text,
          data: 2,
        },
        {
          label: '🔥 Hot',
          kind: CompletionItemKind.Text,
          data: 3,
        },
      ]
    : [];
});

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  switch (item.data) {
    case 1:
      item.detail = 'Notice';
      item.documentation = 'notification or warning of something.';
      break;
    case 2:
      item.detail = 'History';
      item.documentation = 'the whole series of past events connected with someone or something.';
      break;
    case 3:
      item.detail = 'Hot';
      item.documentation = 'new and exciting things.';
  }
  return item;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
