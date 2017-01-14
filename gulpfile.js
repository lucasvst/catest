/**
 * Describe here your assets.
 */
const SOURCES = {
  sass: ['./src/scss/main.scss'],
  vendorFonts: ['./node_modules/bootstrap/fonts/**'],
  vendorCss: ['./node_modules/bootstrap/dist/css/bootstrap.min.css'],
  vendorJs: [
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
    './node_modules/angular-table/dist/angular-table.js'
  ],
  images: ['./src/img/**'],
  scripts: ['./src/app/**/*.js'],
  index: [
    './src/index.html',
    './src/.htaccess'
  ],
  views: ['./src/views/**'],
  api: ['./src/api/**']
}

/**
 * Require all the external libs.
 */
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename')

/**
 * Describe all tasks and subtasks.
 */

/* main tasks */
gulp.task('default', ['build', 'watch'])
gulp.task('build', ['assets', 'html', 'vendor'])
gulp.task('watch', () => gulp.watch(['./src/**'], ['build']))
gulp.task('assets', ['sass', 'images', 'scripts'])
gulp.task('html', ['index', 'views', 'api'])
gulp.task('vendor', ['vendorCss', 'vendorJs', 'vendorFonts'])

/* subtasks */
gulp.task('sass', sassTask)
gulp.task('images', imagesTask)
gulp.task('scripts', scriptsTask)
gulp.task('index', indexTask)
gulp.task('views', viewsTask)
gulp.task('api', apiTask)
gulp.task('vendorCss', vendorCssTask)
gulp.task('vendorJs', vendorJsTask)
gulp.task('vendorFonts', vendorFontsTask)

/**
 * Code your tasks :).
 */
function sassTask(done) {
  gulp.src(SOURCES.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./dist/css/'))
    .on('end', done)
}

function vendorFontsTask(done) {
  gulp.src(SOURCES.vendorFonts)
    .pipe(gulp.dest('./dist/fonts/'))
    .on('end', done)
}

function vendorCssTask(done) {
  gulp.src(SOURCES.vendorCss)
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./dist/css/'))
    .on('end', done)
}

function vendorJsTask(done) {
  gulp.src(SOURCES.vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js/'))
    .on('end', done)
}

function imagesTask(done) {
  gulp.src(SOURCES.images)
    .pipe(gulp.dest('./dist/img/'))
    .on('end', done)
}

function scriptsTask(done) {
  gulp.src(SOURCES.scripts)
    .pipe(concat('main.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js/'))
    .on('end', done)
}

function indexTask(done) {
  gulp.src(SOURCES.index)
    .pipe(gulp.dest('./dist/'))
    .on('end', done)
}

function viewsTask(done) {
  gulp.src(SOURCES.views)
    .pipe(gulp.dest('./dist/views/'))
    .on('end', done)
}

function apiTask(done) {
  gulp.src(SOURCES.api)
    .pipe(gulp.dest('./dist/api'))
    .on('end', done)
}