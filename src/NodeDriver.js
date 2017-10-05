export default function NodeDriver(app) {

  // Make node context hyperapp compliant
  global.requestAnimationFrame = process.nextTick
  global.document = { body: false }

  return function(props) {
    // Use custom view
    props.view = props.view || function (state, actions) {
      props.terminal(state, actions)
    }

    // Add node actions
    props.actions.exit = function (state, actions, keep) {
      if (keep) process.stdout.write('\n')
      process.exit()
    }

    return app(props)
  }
}