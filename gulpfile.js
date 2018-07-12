let gulp = require('gulp')

let rename = require("gulp-rename");
let exec = require('child_process').exec;
let babel = require('gulp-babel');

let wasm_config = require('./wasm.config.js');

gulp.task('build', (cb) => {
    let cmd = `emcc ${wasm_config.flags.join(' ')} ${wasm_config.inputfile} -o ${wasm_config.outputfile}`
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error('❌\tCompilation Failed. Did you activated emsdk environment?\n');
            console.error(` $ ${cmd} \nstdout: ${stdout} \nstderr: ${stderr}\n`);
        } else { console.log("✔\tCompilation successul ") }
        cb()
    })
});

gulp.task('compress', (cb) => {
    return gulp.src('dist/dubins.js')
                .pipe(babel({presets: ["@babel/preset-env",'minify']}))
                .pipe(rename({ suffix: '.min' }))
                .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['build','compress'], async () => { });