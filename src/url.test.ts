import { expect, it } from 'vitest'

import { normalUrl } from './utils'

it('ssh- :', () => {
  const url = normalUrl('git@mygitlab.fr:user/repo')
  expect(url).toBe('https://mygitlab.fr/user/repo')
})

it('ssh-', () => {
  const url = normalUrl(
    'git@github.com:wChenonly/vscode-open-in-repository-button.git',
  )
  expect(url).toBe(
    'https://github.com/wChenonly/vscode-open-in-repository-button',
  )
})

it('https -', () => {
  const url = normalUrl(
    'https://github.com/wChenonly/vscode-open-in-repository-button.git',
  )
  expect(url).toBe(
    'https://github.com/wChenonly/vscode-open-in-repository-button',
  )
})
