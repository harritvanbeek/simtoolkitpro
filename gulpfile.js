'use strict';

import gulp             from 'gulp';
import rename           from 'gulp-rename';
import * as dartSass    from 'sass';
import gulpSass         from 'gulp-sass';
import autoprefixer     from 'gulp-autoprefixer';
import sourcemaps       from 'gulp-sourcemaps';
import uglify           from 'gulp-uglify';
import plumber          from 'gulp-plumber';
import concat           from 'gulp-concat';
import browserSync      from 'browser-sync';

const sass              = gulpSass(dartSass);
       
        //styles
var     styleDEV		=	"dev/scss/template[01].scss",
        styleWatch		=	"dev/scss/**/*.scss",
		
        //Online folders
		styleLOC		=	"./template[01]/"		   
		

function browser_sync(){
    browserSync.init();	
}

function reload(done){
    browserSync.reload();
    done();
}

function style(done){
    gulp.src(styleDEV)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe( sass({ errorLogToConsole: true, outputStyle: 'compressed'}))
        .on('error', console.error.bind( console ) )
        .pipe( autoprefixer({ browers:['last 2 versions'], cascade:false }))
        .pipe( rename('style.css') )
        /* .pipe(sourcemaps.write('./sourcemaps/'))	 */	
        .pipe(gulp.dest(styleLOC))
        .pipe(browserSync.stream({injectChanges:true}) );
    done();  
}

function watch_files(){
    gulp.watch(styleWatch, gulp.series(style));
    gulp.watch("**/**/*.html", gulp.series(reload));
}

gulp.task("style", style);
gulp.task("browser_sync", browser_sync);
gulp.task("watch", gulp.parallel(browser_sync, watch_files));
gulp.task("default", gulp.parallel(style, "watch"));
