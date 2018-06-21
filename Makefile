wasm:
	emcc -lm -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' demos/demo.c -s MODULARIZE=1 -s 'EXPORT_NAME="DubinsCurve"' -o dist/dubins.js

preview:
	python -m http.server .