import gulp from "gulp";
import del from "del";

const $ = require("gulp-load-plugins")();

const scripts = [
    "./node_modules/riot/riot.js",
    "./node_modules/event-source-polyfill/eventsource.js",
    "./client/dev/js/*.js",
    "!./**/*.min.js",
];

gulp.task("clean", () =>
    del(["./client/dev/**/*", "./client/dest/**/*"])
);

gulp.task("copy", () =>
    gulp.src("./client/src/*.html")
        .pipe(gulp.dest("./client/dest/"))
);

gulp.task("fonts", () =>
    gulp.src("./node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest("./client/dest/fonts/"))
);

gulp.task("styles", () =>
    gulp.src("./node_modules/font-awesome/css/*.min.css")
        .pipe(gulp.dest("./client/dest/css/"))
);

gulp.task("build", () =>
    gulp.src("./client/src/tags/*.tag", { since: gulp.lastRun("build") })
        .pipe($.riot({ type: "babel" }))
        .pipe(gulp.dest("./client/dev/js/"))
);

gulp.task("minify", () =>
    gulp.src(scripts)
        .pipe($.uglify())
        .pipe($.concat("main.js"))
        .pipe(gulp.dest("./client/dest/"))
);

gulp.task("test", (cb) => {
    console.error("Error: no test specified");
    cb();
});

gulp.task("watch", (cb) =>
    gulp.watch("./client/src/tags/*.tag", gulp.series("build", "minify"))
);

gulp.task("default",
    gulp.series("clean", "build", gulp.parallel("minify", "copy", "fonts", "styles"))
);
