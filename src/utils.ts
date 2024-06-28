export function normalUrl(url: string) {
  return url
    .trim()
    .replace(/\.git$/, '')
    .replace(/^git@([^:]+):/, 'https://$1/')
}
