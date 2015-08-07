
module.exports = function(grunt) {
  'use strict';


  var configBridge = grunt.file.readJSON('configBridge.json', { encoding: 'utf8' });

  grunt.initConfig({

    // start a local server
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          open: true,
          base: '.',
          livereload: true
        }
      }
    },

    // compile less code to css
    less: {
      development: {
        options: {
          sourceMap: true
        },
        files:  {
                  "assets/css/app.css": "source/less/app.less",
                  "assets/css/style.css": "source/less/style.less",
                  "assets/css/bigvideo.css": "source/less/bigvideo.less"
                }
      }
    },

    // validates javascript code so it follows best practices
    jshint: {
      files: ["Gruntfile.js", "source/js/**/*.js"],
      options: {
        globals: {jQuery: true}
      }
    },

    // concat all js files into one
    concat: {
      options: {
        seperator: ";"
      },
      js_frontend: {
        src: [
          "components/jquery-ui/jquery-ui.js",
          "source/js/jquery.transit.min.js",
          "components/modernizer/modernizr.js",
          "components/eventEmitter/EventEmitter.js",
          "components/eventie/eventie.js",
          "components/imagesLoaded/imagesLoaded.js",
          "components/video.js/dist/video-js/video.js",
          "components/bootstrap/js/transition.js",
          "components/bootstrap/js/modal.js",
          "components/jasny-bootstrap/js/offcanvas.js",
          "components/BigVideo.js/lib/bigvideo.js",
          "components/ekko-lightbox/dist/ekko-lightbox.js",
          "source/js/bigvideo.js",
          "source/js/offcanvas.js",
          "source/js/ajaxform.js"
        ],
        dest: "assets/js/app.min.js"
      }
    },

    // will update the browser when js or less or css or html changes, automatically!
    watch: {
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['source/less/**/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      }
    },

    
    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'app/assets/css/app.css'
      }
    },

    // versioning this project on git automatically
    // grunt-shell allows you to execute shell commands from within this Gruntfile
    shell: {
      bumpVersion: {
        command: 'npm version patch'
      }
    }

  });

  
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ejs');
  
  // Register Grunt tasks

  grunt.registerTask('release',['shell: bumpVersion']);

  grunt.registerTask('dev', ['watch']);


  grunt.registerTask('preview', ['shell:previewSite']);

  grunt.registerTask('default',[
    'less:development',
    'autoprefixer:core',
    'connect',
    'watch'
  ]);
  
};