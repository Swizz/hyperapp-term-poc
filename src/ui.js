import { terminal } from 'terminal-kit'

export function ProgressBar() {
  let progressBar
  return (props) => {
    if (progressBar === undefined) {
      progressBar = terminal.progressBar(props)
    } else {
      progressBar.update(props)
    }
  }
}