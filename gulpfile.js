var gulp = require('gulp'),
minifycss = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
cssc = require('gulp-css-condense')
;


gulp.task('styles', function () {
return gulp.src('css/src/*.css')
    .pipe(cssc())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
return gulp.src('js/src/*.js')
.pipe(rename({suffix: '.min'}))
.pipe(uglify())
.pipe(gulp.dest('js/dist'))
.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default', ['styles','scripts']);