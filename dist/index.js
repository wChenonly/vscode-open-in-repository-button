"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var import_vscode = require("vscode");
var import_node_child_process = require("child_process");
function activate(context) {
  if (!import_vscode.workspace.workspaceFolders || import_vscode.workspace.workspaceFolders.length === 0)
    return;
  const statusBar = import_vscode.window.createStatusBarItem(import_vscode.StatusBarAlignment.Left, 0);
  statusBar.command = "openBrowser";
  statusBar.text = "$(ports-open-browser-icon)";
  statusBar.tooltip = "Open Browser";
  statusBar.show();
  const disposable = import_vscode.commands.registerCommand("openBrowser", async () => {
    var _a;
    const projectRoot = (_a = import_vscode.workspace.workspaceFolders) == null ? void 0 : _a[0].uri.path;
    (0, import_node_child_process.exec)(`git -C ${projectRoot} config --get remote.origin.url`, (err, stdout) => {
      if (err) {
        import_vscode.window.showErrorMessage(err.message);
        return;
      }
      const gitUrl = stdout.replace(".git", "").replace(".com:", ".com/").replace("git@", "https://").trim();
      import_vscode.env.openExternal(import_vscode.Uri.parse(gitUrl));
    });
  });
  context.subscriptions.push(disposable);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
