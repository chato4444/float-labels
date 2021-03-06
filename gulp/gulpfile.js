/**
 * Use npm i -f to bypass fsevents error
 */

var browserSync = require('browser-sync').create();
var compass     = require('compass-importer');
var concat      = require('gulp-concat');
var config      = require('./local.json');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var jsDest      = '../js/';

gulp.task('sass', function() {
    return gulp.src('../scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            'importer' : compass,
            'outputStyle' : 'compressed'
        }))
        .on('error', function (err) {
            console.log(err.message)
            this.emit('end')
        })
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('../css'))
        .pipe(browserSync.stream());
});

gulp.task('js-min', function(){
    return gulp.src(['../js/jquery.float-label.js'])
        //.pipe(concat('concat.js'))
        //.pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(jsDest));
});

gulp.task('serve', ['sass', 'js-min'], function(){
    browserSync.init({
        port    : 8080,
        proxy   : config.domain,
        ghostMode: {
            scroll: true,
        },

        /**
         * If multiple network adapters present and active,
         * browser-sync will display the IP from the first
         * adapter it finds as the External Access Url.
         * Use ifconfig (*nix) or ipconfig (windows) to
         * find correct internal IP.
         */

        // Host can be specified if necessary.
        //host    : '192.168.86.20',

        /**
         * Can specify a proxy domain that can access site
         * from outside of local network. The 'tunnel' option
         * specifies the subdomain from a predetermined proxy
         * domain
         */
        //tunnel  : 'tunnel-name'
    });

    gulp.watch('../scss/**/*.scss', ['sass']);
    gulp.watch('../js/*.js', ['js-min']).on('change', browserSync.reload);
    gulp.watch('../**/*.php').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);