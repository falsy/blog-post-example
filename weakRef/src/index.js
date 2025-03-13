class Counter {
  constructor(element) {
    // Remember a weak reference to the DOM element
    this.ref = new WeakRef(element)
    this.registry = new FinalizationRegistry((heldValue) => {
      console.log(`GC 발생: ${heldValue}`)
    })
    this.registry.register(this.ref, "Counter Element")
    this.start()
  }

  start() {
    if (this.timer) {
      return
    }

    this.count = 0

    const tick = () => {
      // Get the element from the weak reference, if it still exists
      const element = this.ref.deref()
      if (element) {
        element.textContent = ++this.count
      } else {
        // The element doesn't exist anymore
        console.log("The element is gone.")
        this.stop()
        this.ref = null
      }
    }

    tick()
    this.timer = setInterval(tick, 1000)
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = 0
    }
  }
}

const counter = new Counter(document.getElementById("counter"))
setTimeout(() => {
  document.getElementById("counter").remove()
}, 5000)
