function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  // args 是store.dispatch 依赖
  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args))
  })
}

// const compose =
//   (...funcs) =>
//   (x) =>
//     functions.reduceRight((acc, fn) => fn(acc), x);
const user = { name: "Gianmarco", password: 1234 }
const getUserName = (user) => {
  console.log("name")
  return user.name
}
const upperCase = (string) => {
  console.log("up")
  return string.toUpperCase()
}
const firstFour = (string) => string.substring(0, 4)

let c = compose(firstFour, upperCase, getUserName)

// c

console.log(c(fn))
