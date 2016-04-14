// Include gulp
var gulp = require('gulp');
// Define base folders
var src = 'app/';
var dest = 'build/';
// Include plugins
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(dest + 'js'));
});
// Compile CSS from Sass files
gulp.task('sass', function() {
    return sass('app/css/app.scss', {
            style: 'compressed'
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/css'));
});
gulp.task('images', function() {
    return gulp.src('bower_components' + '/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(dest + 'assets/images'));
});
// Copy all other files to dist directly
gulp.task('templates', function() {
    // Copy html
    gulp.src('app/templates/**/*.html')
        .pipe(gulp.dest(dest + 'templates'));
});
gulp.task('bower_components', function() {
    // Copy html
    gulp.src('bower_components/**/*.*')
        .pipe(gulp.dest(dest + 'bower_components'));
    gulp.src('bower_components/**/*.css')
        .pipe(gulp.dest(dest + 'bower_components'));
});
gulp.task('index', function() {
    // Copy html
    gulp.src('index.html')
        .pipe(gulp.dest(dest));
});
// Watch for changes in files
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch(src + 'js/**/*.js', ['scripts'], function(event, done) {
        gulp.start('default', done);
    });
    // Watch .scss files
    gulp.watch(src + 'css/*.scss', ['sass'], function(event, done) {
        gulp.start('default', done);
    });

    gulp.watch(src + 'templates/**/*.html', ['templates'], function(event, done) {
        gulp.start('default', done);
    });
    // Watch image files
    gulp.watch('bower_components' + 'images/**/*', ['images']);
});
// Default Task
gulp.task('default', ['scripts', 'sass', 'images', 'templates', 'index', 'bower_components', 'watch']);

gulp.task('serve', ['default', 'watch'], function() {
    gulp.src('build')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb(!(/node_modules/.test(filePath)));
                }
            }
        }));
});