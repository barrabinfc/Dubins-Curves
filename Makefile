# Used by travis-ci
build_wasm:
	emcc -lm -I ./include/ --post-js ./src/dubins.js -s EXPORT_NAME="Dubins" \
			-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']" -s MODULARIZE=1 -s WASM=1 \
			  ./src/dubins.c -o ./dist/dubinsWASM.js