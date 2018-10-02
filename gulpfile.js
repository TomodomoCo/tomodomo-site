/**
 * Load Gulp and Gulp-adjacent dependencies
 */
const gulp           = require('gulp')
const gutil          = require('gulp-util')
const concat         = require('gulp-concat')
const cssnano        = require('gulp-cssnano')
const imagemin       = require('gulp-imagemin')
const mainBowerFiles = require('main-bower-files')
const sass           = require('gulp-sass')
const sassAssetFuncs = require('node-sass-asset-functions')
const sassglob       = require('gulp-sass-glob')
const svgo           = require('gulp-svgo')
const svgSprite      = require('gulp-svg-sprite')
const twig           = require('gulp-twig')
const twigMarkdown   = require('twig-markdown')
const uglify         = require('gulp-uglify')
const webpack        = require('webpack-stream')

/**
 * Sass to CSS compilation, minification, and prefixing
 */
gulp.task('css', function() {
  gulp.src('app/assets/sass/*.scss')
    .pipe(sassglob())
    .pipe(sass({
      functions: sassAssetFuncs({
        'images_path':      'public/assets/img/',
        'http_images_path': '/assets/img/',
        'fonts_path':       'public/assets/fonts/',
        'http_fonts_path':  '/assets/fonts/',
      }),
      includePaths: [
        './vendor/bower_components',
        './vendor/bower_components/breakpoint-sass/stylesheets',
      ],
    }).on('error', sass.logError))
    .pipe(cssnano({
      autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false,
      },
      discardComments: {
        removeAll: true,
      },
      zindex: false,
    }))
    .pipe(gulp.dest('public/assets/css/'))
})

/**
 * Font placement
 */
gulp.task('fonts', function () {
  gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('public/assets/fonts/'))
})

/**
 * Image minification
 */
gulp.task('images', function () {
  gulp.src('app/assets/img/**/*')
    .pipe(imagemin({
      progressive: true,
      multipass: true,
    }))
    .pipe(gulp.dest('public/assets/img/'))
})

/**
 * Spritify SVGs
 */
gulp.task('sprites', function () {
  gulp.src('app/assets/sprites/**/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: true
      }
    }))
    .pipe(gulp.dest('public/assets/sprites'))
})

/**
 * Handle normal SVGs
 */
gulp.task('svg', function () {
  gulp.src('app/assets/svg/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('public/assets/img'))
})

/**
 * JavaScript compilation
 */
gulp.task('js', function () {
  gulp.src('app/assets/js/script.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/assets/js/'))
})

/**
 * Watch filesystem for changes
 */
gulp.task('watcher', function () {
  gulp.watch('app/assets/sass/**/*.scss',   ['css'])
  gulp.watch('app/assets/fonts/**/*',       ['fonts'])
  gulp.watch('app/assets/img/**/*',         ['images'])
  gulp.watch('app/assets/sprites/**/*.svg', ['sprites'])
  gulp.watch('app/assets/svg/**/*.svg',     ['svg'])
})

/**
 * Set up default task
 */
gulp.task('default', [
  'images',
  'sprites',
  'svg',
  'js',
  'fonts',
  'css',
])

/**
 * Set up watch task
 */
gulp.task('watch', [
  'default',
  'watcher'
])
