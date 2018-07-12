const path = require('path')
const Dubins = require('../dist/dubins.js');

const DubinsWASMFile = path.resolve(__dirname, '../dist/dubins.wasm');

describe('Dubins JS Wrapper', () => {
    let dubins = null
    beforeAll( () => {
        return Dubins({
            'ENVIRONMENT': 'NODE',
            locateFile: (f) => {
                return (f === 'dubins.wasm' && DubinsWASMFile);
            }
        }).then( (module) => { dubins = module })
    } )

    test('ABI is correct', () => {
        expect(dubins).toBeDefined();
        expect(dubins.shortest_path).toBeDefined();
        expect(dubins.path_length).toBeDefined();
        expect(dubins.sample).toBeDefined();    
    })
    test('Creating a new path', () => {
        let path = dubins.shortest_path([0,0,0], [200,200, Math.PI], 50);
        expect(path.constructor).toBe(dubins.DubinsPath);
        expect(path.type).toBeDefined();
        expect(path.length).toBeGreaterThan(0);
    })
    test('Sampling path', () => {
        let path = dubins.shortest_path([0,0,0], [10,10,Math.PI], 50);
        for(var i=0; i < path.length; i += 0.25){
            console.log(dubins.sample(path, i));
        }
        expect(true).toBe(true);
    })
})