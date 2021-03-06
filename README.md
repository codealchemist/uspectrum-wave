# µ-spectrum-wave

Wave spectrum analyzer for WebAudio.

![screenshot](https://cldup.com/B7YiReTn8s.gif)

## Install

`npm i uspectrum-wave`

## Usage

```
import USpectrumWave from 'uspectrum-wave'

const spectrum = new USpectrumWave({ context, buffer, source, canvas })
spectrum
  .init({ context: AudioContext, buffer: AudioBuffer, source: AudioSource })
  .render()
```

## Constructor

All params are optional.

- `context`: An [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) object.
- `buffer`: An [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) object.
- `source`: An [AudioBufferSourceSource](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) object.
- `canvas`: Can be:
  - A CSS selector pointing to a canvas element rendered on the page.
  - A reference to a canvas element.
  - Unset: a canvas element will be created an appended to body.

## Methods

- `init({ context, buffer, source })`: Initializes audio analyzer and connects it to audio source. See **Constructor** for signature reference. Allows chaining.
- `render`: Requests animation frame and starts rendering audio data with buffer updates.
- `setFftSize(size)`: Sets [fftSize](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) property on AnalyzerNode. Default is 2048.
- `setMinDb(db)`: Sets [minDecibels](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/minDecibels) property on AnalyzerNode. Default is -90.
- `setMaxDb(db)`: Sets [maxDecibels](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/maxDecibels) property on AnalyzerNode. Default is -10.
- `setSmoothing(smoothing)`: Sets [smoothingTimeConstant](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant) on AnalyzerNode. Default is 0.85.
- `setBackground(color)`: Sets canvas background color. Default is 'black'.
- `setColor(color)`: Sets canvas line color. Default is 'yellow'.
- `setLineWidth(width)`: Sets canvas line width. Default is 2.

## Usage with µ-player

**µ-player** is a WebAudio based programatic player that plays well with **µ-spectrum-wave**.

```
import Player from 'uplayer'

const player = new Player('https://some.mp3')
player
  .on('play', () => {
    spectrum
      .init({ context: player.context, buffer: player.buffer, source: player.source })
      .render()
  })
  .load()
  .play()
```
