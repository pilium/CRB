var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	del = require('del'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	spritesmith = require('gulp.spritesmith'),
	cache = require('gulp-cache'),
	svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	ftp = require('vinyl-ftp'),
	critical = require('critical'),
	notify = require('gulp-notify');

// Скрипты проекта

// Работа с Pug
gulp.task('pug', function () {
	return gulp.src('app/pug/pages/**/*.pug')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(pug({
			pretty: false //минификация: False
		}))
		.on('error', notify.onError(function (error) {
			return 'Message to the notifier: ' + error.message;
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app'));
});

gulp.task('js', function () {
	return gulp.src([
			'app/js/common.js' // Всегда в конце
		])
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function () {
	return gulp.src('app/sass/main.sass')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expand'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['pug', 'sass', 'js', 'browser-sync'], function () {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function () {
	return gulp.src([
			'app/img/**/*.jpg',
			'app/img/**/*.png'
		])
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'));
});

// Сборка спрайтов PNG
gulp.task('cleansprite', function () {
	return del.sync('app/img/sprite/sprite.png');
});

gulp.task('spritemade', function () {
	var spriteData =
		gulp.src('app/img/sprite/png/*.*')
		.pipe(spritesmith({
			imgName: '../img/sprite/sprite.png',
			cssName: '_sprite.sass',
			padding: 15,
			cssFormat: 'sass',
			algorithm: 'binary-tree',

		}));

	spriteData.img.pipe(rename('sprite.png')).pipe(gulp.dest('app/img/sprite/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);

// Сборка спрайтов SVG
gulp.task('Scleansprite', function () {
	return del.sync('app/img/sprite/sprite.svg');
});
gulp.task('svg-spritemade', function () {
	return gulp.src('app/img/icons/svg/**/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						sass: {
							dest: '../../../sass/_sprite.sass',
							template: "app/sass/_sprite_template.sass"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('app/img/sprite/'));
});
gulp.task('svg-sprite', ['Scleansprite', 'svg-spritemade']);

gulp.task('build', ['removedist', 'svg-sprite', 'imagemin', 'sass', 'js'], function () {

	var buildHtml = gulp.src([
		'app/*.html',
	]).pipe(gulp.dest('dist'));

	var buildFiles = gulp.src([
		'app/files/**/*.*',
	]).pipe(gulp.dest('dist/files'));

	var buildAccess = gulp.src([
		'.htaccess',
	]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
	]).pipe(gulp.dest('dist/js'));

	var buildSprite = gulp.src([
		'app/img/sprite/sprite.svg',
	]).pipe(gulp.dest('dist/img/sprite/'));
});

gulp.task('critical', function () {
	critical.generate({
		inline: true,
		base: 'dist/',
		src: 'index.html',
		dest: 'index-critical.html',
		minify: true
	});
});


gulp.task('deploy', function () {

	var conn = ftp.create({
		host: 'hostname.com',
		user: 'username',
		password: 'userpassword',
		parallel: 10,
		log: gutil.log
	});

	var globs = [
		'dist/**',
		'dist/.htaccess',
	];
	return gulp.src(globs, {
			buffer: false
		})
		.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function () {
	return del.sync('dist');
});
gulp.task('clearcache', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
