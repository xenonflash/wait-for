const waitFor = require('../src/wait-for.js')
// 模拟异步加载
setTimeout(() => {
  global.tag = function(...args) {console.log(...args)}
}, 2000);

function test(){
  console.log('excute')
}

waitFor(() => typeof global.tag === 'function').then(res => {
  test()
})



