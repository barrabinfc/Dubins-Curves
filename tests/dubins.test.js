const path = require('path')
const Dubins = require('../dist/dubins.js');

const DubinsWASMFile = path.resolve(__dirname, '../dist/dubins.wasm');

const sampleMock = [
    [0.000000, 0.000000, 0.000000, 0.000000],
    [0.099833, 0.004996, 0.100000, 0.100000],
    [0.198669, 0.019933, 0.200000, 0.200000],
    [0.295520, 0.044664, 0.300000, 0.300000],
    [0.389418, 0.078939, 0.400000, 0.400000],
    [0.479729, 0.121829, 0.463607, 0.500000],
    [0.569173, 0.166546, 0.463607, 0.600000],
    [0.658618, 0.211264, 0.463607, 0.700000],
    [0.748062, 0.255982, 0.463607, 0.800000],
    [0.837507, 0.300700, 0.463607, 0.900000],
    [0.926952, 0.345417, 0.463607, 1.000000],
    [1.016396, 0.390135, 0.463607, 1.100000],
    [1.105841, 0.434853, 0.463607, 1.200000],
    [1.195285, 0.479571, 0.463607, 1.300000],
    [1.284730, 0.524288, 0.463607, 1.400000],
    [1.374174, 0.569006, 0.463607, 1.500000],
    [1.463619, 0.613724, 0.463607, 1.600000],
    [1.553063, 0.658441, 0.463607, 1.700000],
    [1.642508, 0.703159, 0.463607, 1.800000],
    [1.731952, 0.747877, 0.463607, 1.900000],
    [1.821397, 0.792595, 0.463607, 2.000000],
    [1.910841, 0.837312, 0.463607, 2.100000],
    [2.000286, 0.882030, 0.463607, 2.200000],
    [2.089731, 0.926748, 0.463607, 2.300000],
    [2.179175, 0.971465, 0.463607, 2.400000],
    [2.268620, 1.016183, 0.463607, 2.500000],
    [2.358064, 1.060901, 0.463607, 2.600000],
    [2.447509, 1.105619, 0.463607, 2.700000],
    [2.536953, 1.150336, 0.463607, 2.800000],
    [2.626398, 1.195054, 0.463607, 2.900000],
    [2.715842, 1.239772, 0.463607, 3.000000],
    [2.805287, 1.284489, 0.463607, 3.100000],
    [2.894731, 1.329207, 0.463607, 3.200000],
    [2.984176, 1.373925, 0.463607, 3.300000],
    [3.073620, 1.418643, 0.463607, 3.400000],
    [3.163065, 1.463360, 0.463607, 3.500000],
    [3.252510, 1.508078, 0.463607, 3.600000],
    [3.341954, 1.552796, 0.463607, 3.700000],
    [3.431399, 1.597513, 0.463607, 3.800000],
    [3.520843, 1.642231, 0.463607, 3.900000],
    [3.610288, 1.686949, 0.463607, 4.000000],
    [3.699732, 1.731667, 0.463607, 4.100000],
    [3.789177, 1.776384, 0.463607, 4.200000],
    [3.878621, 1.821102, 0.463607, 4.300000],
    [3.968066, 1.865820, 0.463607, 4.400000],
    [4.057510, 1.910537, 0.463607, 4.500000],
    [4.146955, 1.955255, 0.463607, 4.600000],
    [4.236399, 1.999973, 0.463607, 4.700000],
    [4.325844, 2.044691, 0.463607, 4.800000],
    [4.415289, 2.089408, 0.463607, 4.900000],
    [4.503782, 2.135932, 0.527500, 5.000000],
    [4.587530, 2.190502, 0.627500, 5.100000],
    [4.665412, 2.253161, 0.727500, 5.200000],
    [4.736649, 2.323281, 0.827500, 5.300000],
    [4.800530, 2.400164, 0.927500, 5.400000],
    [4.856416, 2.483039, 1.027500, 5.500000],
    [4.903750, 2.571080, 1.127500, 5.600000],
    [4.942057, 2.663407, 1.227500, 5.700000],
    [4.970956, 2.759097, 1.327500, 5.800000],
    [4.990158, 2.857193, 1.427500, 5.900000],
    [4.999470, 2.956717, 1.527500, 6.000000],
    [4.998800, 3.056673, 1.627500, 6.100000],
    [4.988154, 3.156063, 1.727500, 6.200000],
    [4.967640, 3.253893, 1.827500, 6.300000],
    [4.937460, 3.349187, 1.927500, 6.400000],
    [4.897919, 3.440992, 2.027500, 6.500000],
    [4.849409, 3.528390, 2.127500, 6.600000],
    [4.792417, 3.610509, 2.227500, 6.700000],
    [4.727511, 3.686528, 2.327500, 6.800000],
    [4.655340, 3.755688, 2.427500, 6.900000],
    [4.576625, 3.817297, 2.527500, 7.000000],
    [4.492153, 3.870739, 2.627500, 7.100000],
    [4.402767, 3.915482, 2.727500, 7.200000],
    [4.309361, 3.951077, 2.827500, 7.300000],
    [4.212869, 3.977170, 2.927500, 7.400000],
    [4.114253, 3.993499, 3.027500, 7.500000],
    [4.014500, 3.999901, 3.127500, 7.600000],
];


describe('Dubins JS Wrapper', () => {
    let dubins = null;
    beforeAll(() => {
        return Dubins({
            'ENVIRONMENT': 'NODE',
            locateFile: (f) => {
                return (f === 'dubins.wasm' && DubinsWASMFile);
            }
        }).then((module) => { dubins = module })
    })

    test('ABI is correct', () => {
        expect(dubins).toBeDefined();
        expect(dubins.shortest_path).toBeDefined();
        expect(dubins.path_length).toBeDefined();
        expect(dubins.sample).toBeDefined();
    })
    test('Creating a new path', () => {
        let path = dubins.shortest_path([0, 0, 0], [200, 200, Math.PI], 50);
        expect(path.constructor).toBe(dubins.DubinsPath);
        expect(path.type).toBeDefined();
        expect(path.length).toBeGreaterThan(0);
    })
    test('Sampling path', () => {
        let path = dubins.shortest_path([0, 0, 0], [4,4,3.142], 1);
        for (var i = 0, j=0; i < path.length; i += 0.1, j++) {
            let [x,y,rho] = dubins.sample(path, i);
            let [tx,ty,trho, tt] = sampleMock[j];
            
            expect(x).toBeCloseTo(tx, 6);
            expect(y).toBeCloseTo(ty, 6);
            expect(rho).toBeCloseTo(trho, 6);
        }
    })
})