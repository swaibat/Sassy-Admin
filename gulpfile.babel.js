
// Load plugins
import browsersync from 'browser-sync'
import cleanCSS from'gulp-clean-css'
import concat from 'gulp-concat'
import del from 'del'
import gulp from 'gulp'
import htmlbeautify from 'gulp-html-beautify'
import panini from 'panini'
import merge from 'merge-stream'
import rename from "gulp-rename"
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'

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
  return gulp.src([
    './src/scss/*.scss',
    './src/fonts/*.css',
    './node_modules/datatables.net-dt/css/*.min.css',
    './node_modules/malihu-custom-scrollbar-plugin/*.css',
  ])
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest("./dist/assets/css/"));
}

// JS task
export function scripts() {
  return gulp
    .src('./src/js/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}


export function others() {
  // Bootstrap JS
  const bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./dist/assets/bootstrap/js')),
  // ChartJS
    chartJS = gulp.src('./node_modules/chart.js/dist/*.min.js')
    .pipe(gulp.dest('./dist/assets/libs/chartjs/')),
  
    // fonts
    webfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('./dist/assets/fonts/')),

  // dataTables
    dataTables = gulp.src('./node_modules/datatables.net/js/*.min.js')
    .pipe(gulp.dest('./dist/assets/libs/datatables')),
  
    //images 
    images = gulp.src('./src/images/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(gulp.dest('./dist/assets/images/')),

  // Popperjs
    popperJs = gulp.src('./node_modules/popper.js/dist/popper.min.js')
    .pipe(gulp.dest('./dist/assets/libs/popperjs')),

  // ScrollJs
  ScrollJs = gulp.src(['./node_modules/malihu-custom-scrollbar-plugin/*.min.js',"./node_modules/malihu-custom-scrollbar-plugin/*.css"])
  .pipe(gulp.dest('./dist/assets/libs/malihu-custom')),

  // jQuery
    jquery = gulp.src('./node_modules/jquery/dist/*')
    .pipe(gulp.dest('./dist/assets/libs/jquery'));

  return merge(bootstrapJS, chartJS, dataTables, webfonts, jquery,images,popperJs,ScrollJs);
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