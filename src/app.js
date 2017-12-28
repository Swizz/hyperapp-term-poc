import { app } from 'hyperapp/src'

import { ProgressBar } from './ui'

const state = {
  title: 'Serious stuff in progress :',
  progress: 0/100
}

const actions = {
  start() {
    return (state, actions) => actions.next()
  },
  next() {
    return (state, actions) => {
      if (state.progress >= 1) {
        actions.stop()
        return false
      }
      setTimeout(actions.next, 100+Math.random()*400)
      return {
        progress: state.progress + Math.random()/10
      }
    }
  },
  stop() {
    return (state, actions) => {
      process.stdout.write('\n')
      process.exit()
    }
  }
}

const progressBar = ProgressBar()
function view(state, actions) {
  progressBar({
    width: 80,
    percent: true,
    title: state.title,
    progress: state.progress
  })
}

const main = app(state, actions, view)

main.start()