var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps');
    
gulp.task('clean', () => {
  return del([
    'build/*' // clear the 'build' directory
  ]);
});

gulp.task('sass', () => {
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('pug', () => {
  return gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('uglify', (cb) => {
  pump([
    gulp.src('src/js/*.js'),
    uglify(),
    gulp.dest('build')
  ],
  cb
  );
})

gulp.task('webserver', () => {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
    }));
});

gulp.task('default', ['clean', 'sass', 'pug', 'uglify', 'webserver'], () => {
  gulp.watch(['src/styles/*.scss'], ['sass'])
  gulp.watch(['src/*.pug'], ['pug'])
  gulp.watch(['src/js/*.js'], ['uglify'])
});
