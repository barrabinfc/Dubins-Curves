wasm:
	emcc -lm -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']" src/dubins.c -s MODULARIZE=1  --post-js src/dubinsAPI.js  -s EXPORT_NAME="DubinsCurve" -o dist/dubins.js

preview:
	python -m http.server