var markers = {
    RIFF: new Buffer('RIFF'),
    WAVE: new Buffer('WAVE'),
    fmt: new Buffer('fmt '),
    data: new Buffer('data')
};

function WAV(data, options){
    options = options || {};
    var sampleRate = options.sampleRate || 44100;
    var bitDepth = options.bitDepth || 32;
    var channels = options.channels || 2;

    data = new Buffer(data.buffer || data);
    var output = new Buffer(data.byteLength + 44);
    var dv = new DataView(output.buffer);

    var blockAlign = (channels * bitDepth) >> 3;
    var byteRate = blockAlign * sampleRate;
    var subChunk2Size = (data.byteLength / (bitDepth == 32 ? 4 : 2)) * channels * (bitDepth >> 3);
    var chunkSize = 36 + subChunk2Size;

    output.set(markers.RIFF, 0);
    dv.setUint32(4, chunkSize, true);
    output.set(markers.WAVE, 8);
    output.set(markers.fmt, 12);
    dv.setUint32(16, 16, true);
    dv.setUint16(20, bitDepth == 32 ? 3 : 1, true);
    dv.setUint16(22, channels, true);
    dv.setUint32(24, sampleRate, true);
    dv.setUint32(28, byteRate, true);
    dv.setUint16(32, blockAlign, true);
    dv.setUint16(34, bitDepth, true);
    output.set(markers.data, 36);
    dv.setUint32(40, subChunk2Size, true);
    output.set(data, 44);

	return output.buffer;
}

module.exports = WAV;