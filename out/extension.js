"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const node_child_process_1 = require("node:child_process");
function activate(context) {
    if (!vscode_1.workspace.workspaceFolders || vscode_1.workspace.workspaceFolders.length === 0) {
        return;
    }
    const statusBar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 0);
    statusBar.command = 'openBrowser';
    statusBar.text = '$(ports-open-browser-icon)';
    statusBar.tooltip = 'Open Browser';
    statusBar.show();
    let disposable = vscode_1.commands.registerCommand('openBrowser', async () => {
        const projectRoot = vscode_1.workspace.workspaceFolders[0].uri.path;
        (0, node_child_process_1.exec)(`cd ${projectRoot} && git config --get remote.origin.url`, (err, stdout) => {
            if (err) {
                vscode_1.window.showErrorMessage(err.message);
                return;
            }
            const gitUrl = stdout.replace('.git', '').replace('.com:', '.com/').replace('git@', 'https://').trim();
            vscode_1.env.openExternal(vscode_1.Uri.parse(gitUrl));
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
