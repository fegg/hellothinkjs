var gulp = require('gulp');

/* browserify + watchify */
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var src = './www/static/js/food_good.js';
var dest = './www/static/dist/food_good.js';

var extensions = ['.js', '.es6'];

function compile(watch) {
    var browser = browserify({
            debug: true,
            extensions: extensions
        })
        .require(src, {
            entry: true
        });

    var bundler = watchify(browser);

    function rebundle() {
        bundler.bundle().on('error', function(e) {
                console.log(e.message);
            })
            .pipe(source(dest))
            .pipe(buffer())
            .pipe(gulp.dest('./'));
        return bundler;
    }

    if (watch) {
        bundler.on('update', function(msg) {
            console.log(msg);
            rebundle();
        });
    }

    rebundle();
}

gulp.task('build', function() {
    return compile(true);
});

gulp.task('default', ['build']);
