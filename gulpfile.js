var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var lessify = require('lessify');
var minify = require('gulp-minify');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var babel = require('gulp-babel');
var babelify = require('babelify');
var uglifyify = require('uglifyify');

var path = {
  HTML: 'public/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'public/dist',
  DEST_BUILD: 'public/dist/build',
  DEST_SRC: 'public/dist/src',
  ENTRY_POINT: './app/app.js'
};

var home_path = {
  ENTRY_POINT: 'public/views/home.ejs'
}

gulp.task('watch', function() {
  var watcher  = watchify(browserify({
      entries: [path.ENTRY_POINT],
      // transform: [babelify, reactify, lessify],
      debug: true,
      cache: {}, packageCache: {}, fullPaths: true
    })
    .transform('browserify-css')
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('lessify')
  );

  return watcher
    .on('update', function () {
      watcher
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC))
        console.log('Updated');
    })
    .on('transform', function (tr, file) {
      console.log('^.^: ', file);
    })
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [lessify, reactify],
    debug: true,
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build-production', function(){
    browserify({
      entries: [path.ENTRY_POINT],
      transform: [lessify, reactify, babelify, uglifyify],
    })
      .on('transform', function (tr, file) {
        console.log('^.^: ', file);
      })
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .bundle()
      .pipe(source(path.MINIFIED_OUT))
      .pipe(gulp.dest(path.DEST_SRC))
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);
