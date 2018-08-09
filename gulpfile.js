/**
 * Load Gulp and Gulp-adjacent dependencies
 */
var gulp           = require('gulp')
var gutil          = require('gulp-util')
var concat         = require('gulp-concat')
var connect        = require('gulp-connect')
var connectRewrite = require('connect-modrewrite')
var cssnano        = require('gulp-cssnano')
var imagemin       = require('gulp-imagemin')
var mainBowerFiles = require('main-bower-files')
var s3             = require('s3')
var sass           = require('gulp-sass')
var sassAssetFuncs = require('node-sass-asset-functions')
var sassglob       = require('gulp-sass-glob')
var svgo           = require('gulp-svgo')
var svgSprite      = require('gulp-svg-sprite')
var twig           = require('gulp-twig')
var twigMarkdown   = require('twig-markdown')
var uglify         = require('gulp-uglify')

/**
 * Define paths
 */
var src  = 'app/assets/'
var dest = 'public/assets/'

var paths = {
  src: {
    sass:   src + 'sass',
    fonts:  src + 'fonts/**/*',
    images: src + 'images/**/*',
    js:     src + 'javascripts',
    views:  'app/views',
  },
  dest: {
    css:    dest + 'css/',
    fonts:  dest + 'fonts/',
    images: dest + 'img/',
    js:     dest + 'js/',
    views:  'public/',
  }
}

/**
 * Sass to CSS compilation, minification, and prefixing
 */
gulp.task('css', function() {
  gulp.src(paths.src.sass + '/*.scss')
    .pipe(sassglob())
    .pipe(sass({
      functions: sassAssetFuncs({
        'images_path': paths.dest.images,
        'http_images_path': '/assets/img/',
        'fonts_path': paths.dest.fonts,
        'http_fonts_path': '/assets/fonts/',
      }),
      includePaths: [
        './vendor/bower_components',
        './vendor/bower_components/breakpoint-sass/stylesheets'
      ]
    }).on('error', sass.logError))
    .pipe(cssnano({
      autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false
      },
      discardComments: {
        removeAll: true
      },
      zindex: false,
    }))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(connect.reload())
})

/**
 * Font placement
 */
gulp.task('fonts', function () {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dest.fonts))
    .pipe(connect.reload())
})

/**
 * Image minification
 */
gulp.task('images', function () {
  gulp.src(paths.src.images)
    .pipe(imagemin({
      progressive: true,
      multipass: true
    }))
    .pipe(gulp.dest(paths.dest.images))
    .pipe(connect.reload())
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
  /**
   * Default function for compiling JS
   *
   * @param source
   * @param filename
   */
  function jsCompile(source, filename) {
    return gulp.src(source)
      .pipe(concat(filename))
      .on('error', gutil.log)
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(gulp.dest(paths.dest.js))
      .pipe(connect.reload())
  }

  // libraries.js
  jsCompile(mainBowerFiles({
    paths: {
      bowerDirectory: 'vendor/bower_components'
    },
    filter: /\.js$/i
  }), 'libraries.js')

  // script.js
  jsCompile([
    paths.src.js + '/script.js',
    paths.src.js + '/slider.js',
    paths.src.js + '/player.js',
    paths.src.js + '/load-more.js',
    paths.src.js + '/nav.js',
    paths.src.js + '/social.js',
  ], 'script.js')
})

/**
 * Twig to HTML compilation
 */
gulp.task('html', function() {
  gulp.src([
    paths.src.views + '/**/*.twig',
    '!' + paths.src.views + '/**/_*.twig',
    '!' + paths.src.views + '/layouts/**/*',
  ])
    .pipe(twig({
      base: paths.src.views,
      data: {},
      extend: function (Twig) {
        twigMarkdown(Twig)
      }
    }))
    .pipe(gulp.dest(paths.dest.views))
    .pipe(connect.reload())
})

/**
 * Watch filesystem for changes
 */
gulp.task('watcher', function () {
  gulp.watch('app/assets/sass/**/*.scss',      ['css'])
  gulp.watch('app/assets/fonts/**/*',          ['fonts'])
  gulp.watch('app/assets/images/**/*',         ['images'])
  gulp.watch('app/assets/javascripts/**/*.js', ['js'])
  gulp.watch('app/assets/sprites/**/*.svg',    ['sprites'])
  gulp.watch('app/assets/svg/**/*.svg',        ['svg'])
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
