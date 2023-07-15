import {
  createConnection,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
} from "vscode-languageserver/node";

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize((params: InitializeParams) => {
  const result: InitializeResult = {
    capabilities: {},
  };

  return result;
});

connection.onInitialized(() => {});

connection.onDidChangeConfiguration((change) => {
  connection.console.log("We received an configuration change event");
});

connection.onDidChangeWatchedFiles((_change) => {
  connection.console.log("We received an file change event");
});

connection.listen();
