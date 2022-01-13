function createStore(reducer, preloadState, enhancer) {
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadState)
  }
  let currentState = preloadState
  let listeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      listeners.filter((l) => l !== listener)
    }
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    listeners.forEach((l) => l())
    return action
  }

  const store = {
    getState,
    subscribe,
    dispatch,
  }

  return store
}

function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

function applayMiddleware(...middleware) {
  return (createStore) => (reducer, preloadState) => {
    const store = createStore(reducer, preloadState)

    // middleware函数不能调用dispatch
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    // 当调用dispatch时，调用所有中间间
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}

// function logger({ getState, dispatch }) {
//   return next(store.dispatch) => action => {
//     console.log('will dispatch', action)

//     // Call the next dispatch method in the middleware chain.
//     const returnValue = next(action)

//     console.log('state after dispatch', getState())

//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue
//   }
// }

// const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))

function compose(...funcs) {
  return funcs.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  )
}

function foo() {
  console.log("foo")
}

function bar() {
  console.log("bar")
}

function baz() {
  console.log("baz")
  console.log(arguments)
}

let r = compose(foo, bar, baz)

r()
