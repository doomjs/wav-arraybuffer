# WAV(data[, options])

* ```data``` &lt;ArrayBuffer&gt; | &lt;Buffer&gt; PCM audio data
* ```options``` &lt;Object&gt; optional, format settings

```options``` properties are:
* *sampleRate*: set audio sample rate (default is ```44100```)
* *bitDepth*: set audio bit depth (default is ```32```)
* *channels*: set channel count (```1```=mono, ```2```=stereo, default is ```2```)

Convert raw PCM audio data to WAV audio buffer, returns ```ArrayBuffer```.