let gulp = require('gulp')
let exec = require('child_process').exec;
let wasm_config = require('./wasm.config.js');
//import * as gulp from 'gulp';
//import { exec } from 'child_process';
//import * as wasm_config from './wasm.config.js';

gulp.task('build', (cb) => {
    let cmd = `emcc ${wasm_config.flags.join(' ')}  ${wasm_config.inputfile} -o ${wasm_config.outputfile}`
    exec(cmd, (err,stdout,stderr) => {
        if(err){ 
            console.error('❌\tCompilation Failed. Did you activated emsdk environment?\n');
            console.error( ` $ ${cmd} \nstdout: ${stdout} \nstderr: ${stderr}\n`);
        } else { console.log("✔\tCompilation successul ") }
        cb()
    })
});

gulp.task('default',['build'], async () => {});