const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const del = require('del');

const src = {
    scss: 'src/scss/*.scss',
    css: 'src/css',
    html: 'src/*.html',
    js: 'src/scripts/*.js',
    bundle: 'dist',
    clear: 'dist/*'
}

const clearDist = () => {
    return del(src.clear);
}

const convertSass = () => {
    browserSync.notify("Compiling CSS. Stand by...");

    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.stream());
}

const compileJS = () => {
    browserSync.notify("Compiling JS. Stand by...");

    return gulp.src(src.js)
        .pipe(webpack(require('./webpack.dev')))
        .pipe(gulp.dest(src.bundle))
        .pipe(browserSync.stream());
}

const compileHTML= () => {
    browserSync.notify("Compiling HTML. Stand by...");

    return gulp.src(src.html)
        .pipe(webpack(require('./webpack.dev')))
        .pipe(gulp.dest(src.bundle))
        .pipe(browserSync.stream());
}

const watch = () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch(src.scss, convertSass);
    gulp.watch([src.js, src.css], compileJS);
    gulp.watch(src.html, compileHTML).on('change', browserSync.reload);
}

exports.default = gulp.series(clearDist, convertSass, compileJS, compileHTML, watch);