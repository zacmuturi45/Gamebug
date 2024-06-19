const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

function buildSass() {
    return src('src/app/Sass/*.scss')
    .pipe(sass())
    .pipe(purgecss({ content: ['src/app/**/*.jsx' ]}))
    .pipe(dest('src/app/css'))
}

function watchSass() {
    watch(['src/app/Sass/*.scss', 'src/app/**/*.jsx'], buildSass)
}

exports.default = series(buildSass, watchSass)