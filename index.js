module.exports = class USpectrumWave {
  constructor ({ context, buffer, source, canvas } = {}) {
    if (typeof canvas === 'string') canvas = document.getElementById(canvas)
    if (!canvas) {
      canvas = document.createElement('canvas')
      document.body.appendChild(canvas)
    }
    this.$canvas = canvas
    this.canvasContext = this.$canvas.getContext('2d')
    this.background = 'black'
    this.color = 'yellow'
    this.lineWidth = 2
    this.fftSize = 2048
    this.minDb = -90
    this.maxDb = -10
    this.smoothing = 0.85
    this.setSize()
    this.setResizer()

    if (context && buffer && source) this.init({ context, buffer, source })
  }

  setSize () {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.$canvas.width = this.width
    this.$canvas.height = this.height
  }

  setResizer () {
    let resizing = false

    window.addEventListener('resize', () => {
      if (resizing) return
      resizing = true

      setTimeout(() => {
        this.setSize()
        resizing = false
      }, this.resizeThrottle)
    })
  }

  init ({ context, buffer, source }) {
    this.analyser = context.createAnalyser()
    this.analyser.fftSize = this.fftSize
    this.analyser.minDecibels = this.minDb
    this.analyser.maxDecibels = this.maxDb
    this.analyser.smoothingTimeConstant = this.smoothing
    this.analyser.buffer = buffer
    source.connect(this.analyser)
    return this
  }

  setFftSize (size) {
    this.fftSize = size
    return this
  }

  setMinDb (db) {
    this.minDb = db
    return this
  }

  setMaxDb (db) {
    this.maxDb = db
    return this
  }

  setSmoothing (smoothing) {
    this.smoothing = smoothing
  }

  setBackground (color) {
    this.background = color
    return this
  }

  setColor (color) {
    this.color = color
    return this
  }

  setLineWidth (width) {
    this.lineWidth = width
    return this
  }

  render () {
    const bufferLength = this.analyser.fftSize
    const buffer = new Uint8Array(bufferLength)
    window.requestAnimationFrame(() => this.render())
    this.analyser.getByteTimeDomainData(buffer)
    this.canvasContext.fillStyle = this.background
    this.canvasContext.fillRect(0, 0, this.width, this.height)
    this.canvasContext.lineWidth = this.lineWidth
    this.canvasContext.strokeStyle = this.color
    this.canvasContext.beginPath()

    const sliceWidth = (this.width * 1.0) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = buffer[i] / 128.0
      const y = (v * this.height) / 2

      if (i === 0) {
        this.canvasContext.moveTo(x, y)
      } else {
        this.canvasContext.lineTo(x, y)
      }

      x += sliceWidth
    }

    this.canvasContext.lineTo(this.$canvas.width, this.$canvas.height / 2)
    this.canvasContext.stroke()
  }
}
