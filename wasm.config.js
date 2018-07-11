// wasm.config.js
module.exports = {
  emscripten_path: './../emsdk',
  inputfile: './src/dubins.c',
  outputfile: './dist/dubins.js',
  exported_functions: [
    'dubins_shortest_path',
  ],
  flags: [
    '-lm',
    '-I ./include/',
    '--post-js ./src/dubins.js',
    '-s EXPORT_NAME="Dubins"',
    '-s EXTRA_EXPORTED_RUNTIME_METHODS="[\'ccall\']"',
    '-s MODULARIZE=1',
    '-s WASM=1',
    '',
  ],
};

