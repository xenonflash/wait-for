// 模拟异步加载
setTimeout(() => {
  global.gtag = function(...args) {console.log(...args)}
  console.log(gtag)
}, 2000);

function test(){
  console.log('excute')
}

waitFor(() => typeof global.gtag === 'function').then(res => {
  test()
})

/**
 * 等待某一条件成立时执行
 * @param {Function} condition a function return
 * @param {Number} maxTime max wait time, default to 5000ms
 * @param {Boolean} verbose should print some information during execution
 */
function waitFor(condition, maxTime = 5000, verbose = false ) {
  let timer = null
  const start = +(new Date())

  function clearTimer() {
    clearTimeout(timer)
    timer = null
  }

  function loop(res, rej) {
    const duration = +(new Date()) - start
    verbose && console.log('loop', duration)
    timer = setTimeout(() => {
      if (condition()) {
        clearTimer()
        res(duration)
      } else if (duration > maxTime){
        clearTimer()
        rej('MAX_WAIT_TIME')
      } else {
        loop(res, rej)
      }
    }, 30);
  }

  return new Promise((resolve, reject) => {
    if (typeof condition !== 'function') {
      reject('condition should be a function')
      verbose && console.log('condition should be a function')
    }

    if (condition()) {
      resolve()
    } else {
      loop(resolve, reject)
    }
  })
}
