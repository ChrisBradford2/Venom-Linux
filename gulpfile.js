const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const rename = require("gulp-rename");

async function compilescss() {
  gulp
    .src("./sources/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: [
            "Chrome >= 35",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 8",
            "Safari >= 8",
            "Android 2.3",
            "Android >= 4",
            "Opera >= 12",
          ],
        }),
      ])
    )
    .pipe(sourcemaps.write())
    .pipe(prefix())
    .pipe(minify())
    .pipe(
      rename(function (path) {
        return {
          dirname: path.dirname + "",
          basename: path.basename + ".min",
          extname: ".css",
        };
      })
    )
    .pipe(gulp.dest("./sources/css"));
}

gulp.task("watch", function () {
  gulp.watch("./sources/scss/*.scss", compilescss);
});

exports.default = compilescss;
