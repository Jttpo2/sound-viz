var gulp = require("gulp"),
livereload = require('gulp-livereload'),
concat = require("gulp-concat");

var deploymentFolder = './deployment/';

gulp.task('default', ['watch']);

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('**/*.css', ['reload', 'copy-css']);
	gulp.watch('**/*.js', ['concat', 'reload']);
	gulp.watch('**/*.html', ['reload']);
});

gulp.task('reload', function() {
	livereload.reload();
}); 

var sketchFolder = "sketch/";
var sketchFiles = [
'sound.js', 
'mic.js'
];

sketchFiles.forEach(function(fileName, index) {
	sketchFiles[index] = sketchFolder + fileName;
});

gulp.task('concat', function() {
	gulp.src(sketchFiles)
	.pipe(concat('concat.js'))
	.pipe(gulp.dest(deploymentFolder));
});


gulp.task('copy-css', function() {
	gulp.src('style.css')
	.pipe(gulp.dest(deploymentFolder));
});