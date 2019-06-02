
// Load plugins
import browsersync from 'browser-sync'
import cleanCSS from'gulp-clean-css'
import del from 'del'
import gulp from 'gulp'
import htmlbeautify from 'gulp-html-beautify'
import panini from 'panini'
import rename from "gulp-rename"
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat';
// BrowserSync
export function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
export function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean dist
export function clean() {
  return del('./dist/');
}

// html tasks
export function html() {
  return gulp
    .src('src/html/pages/**/*.html')
    .pipe(panini({
        root: 'src/html/pages/',
        layouts: 'src/html/layouts/',
        partials: 'src/html/partials/',
        helpers: 'src/html/helpers/',
        data: 'src/html/data/'
    }))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./dist'))

}

// CSS task
export function styles() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/assets/css/"));
}

// JS task
export function scripts() {
  return gulp
    .src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}


export function others() {
    return gulp
    .src(['./src/**/**/*','!./src/scss/**','!./src/html/**'])
    .pipe(gulp.dest('./dist/assets/'));
}

// reset page 
export function htmlReset(done) {
  panini.refresh();
  done();
}

// watch tasks
export function watchfiles() {
  gulp.watch("./src/scss/**/*",gulp.series(htmlReset,styles,browserSyncReload));
  gulp.watch("./src/js/**/*", scripts);
  gulp.watch(['./src/html/{layouts,includes,helpers,partials}/**/*','./src/html/pages/**/*'], gulp.series(htmlReset,html,browserSyncReload));
}

 const build = gulp.series(gulp.series(clean, gulp.parallel(html,styles,scripts,others)), gulp.parallel(browserSync,watchfiles));
export default build;