import { app } from 'hyperapp/src'

import NodeDriver from './NodeDriver'
import { ProgressBar } from './ui'

const progressBar = ProgressBar()

const actions = app(NodeDriver)({
  state: {
    title: 'Serious stuff in progress :',
    progress: 0/100
  },
  actions: {
    start(state, actions) {
      actions.next()
    },
    next(state, actions) {
      if (state.progress >= 1) {
        actions.stop()
        return false
      }
      setTimeout(actions.next, 100+Math.random()*400)
      return {
        progress: state.progress + Math.random()/10
      }
    },
    stop(state, actions) {
      actions.exit(true)
    }
  },
  view(state, actions) {
    progressBar({
      width: 80,
      percent: true,
      title: state.title,
      progress: state.progress
    })
  }
})

actions.start()