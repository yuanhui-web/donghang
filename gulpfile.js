var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  uglifycss = require('gulp-uglifycss'),
  del = require('del'),
  hash = require('gulp-hash'),
  replace = require('gulp-replace'),
  tap = require('gulp-tap'),
  gutil = require('gulp-util'),
  conf = require('./conf');

var hashOptions = {
  algorithm: 'md5',
  hashLength: 10,
  template: '<%= hash %><%= ext %>'
};

var getRealPath = function(name,type) {
  var path = conf[type][name].path,
    source = conf[type][name].source;
  return source.map(function(s) {
    return path + s
  });
};

var getRealDest = function(name, type) {
  return conf[type][name].dest;
};

var delFile = function(path) {
  del(path, function(err) {});
};

var task = function(name, type) {

  var realPath = getRealPath(name, type),
    realDest = getRealDest(name, type),
    r = new RegExp(type + '\\\/' + name + '\\\/[^.]*\\\.' + type, "g");

  delFile(realDest);

  if (type === 'css') {
    gulp
      .src(realPath)
      .pipe(uglifycss({
        cuteComments: true
      }))
      .pipe(concat('c.css'))
      .pipe(hash(hashOptions))
      .pipe(tap(function(file, t) {
        var hashValue = file.hash;
        gulp.src(['./index.html'])
          .pipe(replace(r, type + '/' + name + '/' + hashValue + '.' + type))
          .on('error', function(err) {
            console.log(err.message);
          })
          .pipe(gulp.dest('./'));
      }))
      .on('error', function(err) {
        console.log(err.message);
      })
      .pipe(gulp.dest(realDest));
  } else if (type === 'js') {
    gulp
      .src(realPath)
      .pipe(concat('c.js'))
      // .pipe(uglify()).on('error', function(err){console.log(err);})
      .pipe(hash(hashOptions))
      .pipe(tap(function(file, t) {
        hashValue = file.hash;
        gulp.src(['./index.html'])
          .pipe(replace(r, type + '/' + name + '/' + hashValue + '.' + type))
          .on('error', function(err) {
            console.log(err.message);
          })
          .pipe(gulp.dest('./'));
      }))
      .on('error', function(err) {
        console.log(err.message);
      })
      .pipe(gulp.dest(realDest));
  }
};

var taskArr = [];
var defaultTast = [];

for (var p in conf) {
  for (var m in conf[p]) {
    var name = p + '-' + m;
    taskArr.push([name, m, p]);
    defaultTast.push(name);
  }
};

taskArr.forEach(function(e, i, arr) {
  gulp.task(e[0], function() {
    task(e[1], e[2]);
  });
});

gulp.task('watch', function() {

  taskArr.forEach(function(e, i, arr) {
    var arr = [];
    arr.push(e[0]);
    gulp.watch(getRealPath(e[1], e[2]), arr);
  });

});

defaultTast.push('watch');

gulp.task('default', defaultTast);
