import {
  StatusBarAlignment,
  window,
  ExtensionContext,
  commands,
  workspace,
  env,
  Uri,
} from "vscode";
import { exec } from "node:child_process";

export function activate(context: ExtensionContext) {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
  statusBar.command = "openBrowser";
  statusBar.text = "$(github)";
  statusBar.tooltip = "Open Browser";
  statusBar.show();

  let disposable = commands.registerCommand("openBrowser", async () => {
    const projectRoot = workspace.workspaceFolders![0].uri.path;

    exec(
      `cd ${projectRoot} && git config --get remote.origin.url`,
      (err, stdout) => {
        if (err) {
          window.showInformationMessage(err.message);
          return;
        }

        const gitUrl = stdout
          .replace(".git", "")
          .replace(".com:", ".com/")
          .replace("git@", "https://");

        env.openExternal(Uri.parse(gitUrl));
      }
    );
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
