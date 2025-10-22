const GIT_SUFFIX_RE = /\.git$/
const GIT_SSH_RE = /^git@([^:]+):/

export function normalUrl(url: string): string {
  let result = url.trim()

  if (GIT_SUFFIX_RE.test(result)) {
    result = result.slice(0, -4)
  }

  const match = result.match(GIT_SSH_RE)
  if (match) {
    result = `https://${match[1]}/${result.slice(match[0].length)}`
  }

  return result
}
