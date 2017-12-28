import { app } from 'hyperapp/src'
import { terminal } from 'terminal-kit'

const state = {
  count: 0,
  lastIndex: 0
}

const actions = {
  up: () => state => ({ count: state.count + 1 }),
  down: () => state => ({ count: state.count - 1 }),
  reset: () => ({ count: 0 }),
  quit: () => { process.exit() },
  lastIndex: (lastIndex) => ({ lastIndex }),
  select: ({ selectedIndex }) => (state, actions) => {
    actions.lastIndex(selectedIndex)
    return [actions.up, actions.down, actions.reset, actions.quit][selectedIndex]()
  }
}

const view = (state, actions) => {
  terminal.reset()
  terminal.cyan(`The actual counter is : ${state.count}\n`)

  terminal.singleColumnMenu(
    ['up', 'down', 'reset', 'quit'],
    { selectedIndex: state.lastIndex },
    (err, res) => actions.select(res)
  )
}

const main = app(state, actions, view)