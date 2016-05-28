module.exports = {
  css: {
    lib: {
      path: 'dev/css/',
      dest: './public/css/lib/',
      source: [
        'lib/*.css'
      ]
    },
    page: {
      path: 'dev/css/',
      dest: './public/css/page/',
      source: [
        'page/*.css'
      ]
    },
    common: {
      path: 'dev/css/',
      dest: './public/css/common/',
      source: [
        'common/*.css'
      ]
    }        
  },
  js: {
    ie:{
      path:'dev/js/lib/',
      dest: './public/js/ie/',
      source:[
        'html5shiv.js',
        'json3.min.js',
        'respond.min.js'
      ]
    },
    lib: {
      path: 'dev/js/lib/',
      dest: './public/js/lib/',
      source: [
        'angular.js',
        'angular-route.js',
        'angular-cookies.js',
        'angular-animate.js',
        'angular-meta.js',
        'ui-bootstrap-tpls-0.12.0.js',
        'cookies.js',
        'hamster.js',
        'angular-ueditor.js',
      ]
    },
    main: {
      path: 'dev/js/',
      dest: './public/js/main/',
      source: [
        'f.js',
        'app.js',
        'controllers/*.js',
        'services/*.js',
        'directives/*.js'
      ]
    },
    plugins: {
      path: 'dev/js/lib/',
      dest: './public/js/plugins/',
      source: [
        'jquery.js',
        'highstock.js',
        'jquery.jUploader-1.01.js'
      ]
    }
  }
}
