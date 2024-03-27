import { exec } from 'node:child_process'
import { type ExtensionContext, StatusBarAlignment, Uri, commands, env, window, workspace } from 'vscode'

export function activate(context: ExtensionContext) {
  if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0)
    return

  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.command = 'openBrowser'
  statusBar.text = '$(ports-open-browser-icon)'
  statusBar.tooltip = 'Open Browser'
  statusBar.show()

  const disposable = commands.registerCommand('openBrowser', async () => {
    const projectRoot = workspace.workspaceFolders?.[0].uri.path

    exec(`git -C ${projectRoot} config --get remote.origin.url`, (err, stdout) => {
      if (err) {
        window.showErrorMessage(err.message)
        return
      }

      const gitUrl = stdout.replace('.git', '').replace('.com:', '.com/').replace('git@', 'https://').trim()
      env.openExternal(Uri.parse(gitUrl))
    })
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
