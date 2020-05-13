const { PerformanceObserver, performance } = require('perf_hooks')

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration)
  performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

performance.mark('A')
setTimeout(() => {
  performance.mark('B')
  performance.measure('A to B', 'A', 'B')
})