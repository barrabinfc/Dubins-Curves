/**
 * Dubins Javascript API 
 */

/**
 * Memory helpers, because webassembly only has fundamental type conversion
 */
function _arrayToHeap(typedArray) {
    var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    var ptr = Module._malloc(numBytes);
    var heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    return heapBytes;
}

function _freeArray(heapBytes) {
    Module._free(heapBytes.byteOffset);
}

/**
 * Size of  "Struct"
 * @param {*} typedefinition 
 */
function getSizeOf(typedefinition) {
    // simple
    if (typeof typedefinition === 'string') return getNativeTypeSize(typedefinition)

    // Array of typedefinition
    if (Array.isArray(typedefinition)) {
        return typedefinition.map(t => getSizeOf(t))
            .reduce((prev, curr) => (prev + curr))
    }

    // Object
    let sum = 0
    for (var [key, value] of typedefinition) {
        sum += getSizeOf(value)
    }
    return sum;
}

/**
 * Get Offset of
 */
function getOffsetOf(typedefinition, name) {
    // Object
    let sum = 0
    for (let [key, value] of typedefinition) {
        if (key == name) {
            return sum
        }
        sum += getSizeOf(value)
    }
    return 0
}

const EDUBOK = 0   // No error
const EDUBCOCONFIGS = 1   // Colocated configurations
const EDUBPARAM = 2   // Path parameterisitation error
const EDUBBADRHO = 3   // the rho value is invalid
const EDUBNOPATH = 4   // no connection between configurations with this word

/**
 * Single dubins path 'struct'
 */
class DubinsPath {
    constructor() {
        let byteSize = getSizeOf(this.typedef());

        this._heap_ptr = Module._malloc(byteSize);
        this._heap = new Uint8Array(Module.HEAPU8.buffer, this._heap_ptr, byteSize)
        this._view = new DataView(this._heap.buffer, this._heap.byteOffset)
    }

    /**
     * Byte offset ordering.
     * Ordering is important so we use a Map.
     */
    typedef() {
        return new Map([
            ['qi', ['double', 'double', 'double']],
            ['param', ['double', 'double', 'double']],
            ['rho', 'double'],
            ['type', 'i32']
        ])
    }

    get type() {
        return this._view.getInt32(getOffsetOf(this.typedef(), 'type'), false)
    }
    set type(v) {
        this._view.setInt32(getOffsetOf(this.typedef(), 'type'), v)
    }

    get length() {
        return Module['path_length'](this)
    }

}

/*
* @param startPoint    - a configuration specified as an array of x, y, theta
* @param endPoint      - a configuration specified as an array of x, y, theta
* @param rho   - turning radius of the vehicle (forward velocity divided by maximum angular velocity)
* @return path  - the resultant path
*/
Module['shortest_path'] = function (startPoint, endPoint, rho) {
    let _startP = Float64Array.from(startPoint);
    let _endP = Float64Array.from(endPoint);

    let startHeap = _arrayToHeap(_startP)
    let endHeap = _arrayToHeap(_endP)

    let path = new DubinsPath()

    let test = Module.ccall('dubins_shortest_path', 'number', ['array', 'array', 'number', 'number'],
        [startHeap, endHeap, rho, path._heap.byteOffset]);

    return path
}

Module['path_length'] = function (path) {
    return Module.ccall('dubins_path_length', 'number', ['number'],
        [path._heap.byteOffset])
}

/**
 * Sample position of car at time T.
 * returns array of: [posX,posY, angle]
 */
Module['sample'] = function (path, t) {

    /* Allocate, call, read back and free memory */
    let sampleHeap = _arrayToHeap(Float64Array.from([0, 0, 0]))
    let res = Module.ccall('dubins_path_sample', 'number', ['number', 'number', 'number'],
        [path._heap.byteOffset, t, sampleHeap.byteOffset])

    let what = new Float64Array(sampleHeap.buffer, sampleHeap.byteOffset, 3)
    _freeArray(sampleHeap)

    return what
}