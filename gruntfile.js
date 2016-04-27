module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'public/assets/js/app.js': 'public/assets/js/app.js'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      vendor: {
        files: {
          'public/assets/js/vendor.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/backbone/backbone.js',
            'bower_components/moment/min/moment-with-locales.min.js',
            'bower_components/riot/riot+compiler.min.js',
            'bower_components/d3/d3.min.js',
            'bower_components/c3/c3.min.js'
          ]
        }
      },
      app: {
        files: {
          'public/assets/js/app.min.js': 'public/assets/js/app.js',
          'public/assets/js/templates.min.js': 'public/assets/js/templates.js',
          'public/assets/js/tags.min.js': 'public/assets/js/tags.js'
        }
      }
    },
    watch: {
      appJS: {
        files: [
          'app/scripts/*.js',
          'app/scripts/lib/**/*.js',
          'app/scripts/models/**/*.js',
          'app/scripts/views/**/*.js',
          'app/scripts/modules/**/*.js',
          'app/scripts/collections/**/*.js'
        ],
        tasks: ['concat', 'babel', 'uglify:app']
      },
      all: {
        files: ['app/styles/*.scss', 'app/styles/app/**/*.scss', 'app/styles/components/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      templates: {
        files: ['app/scripts/templates/*', 'app/scripts/modals/**/*'],
        tasks: ['jst', 'uglify:app']
      },
      tags: {
        files: ['app/scripts/tags/*'],
        tasks: ['riot', 'uglify:app']
      },
      html: {
        files: ['public/*.html'],
        tasks: ['htmlmin']
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 10 versions']
      },
      app: {
        src: 'public/assets/css/app.css',
        dest: 'public/assets/css/app.css'
      }
    },
    sass: {
      app: {
        files: {
          'public/assets/css/app.css': ['app/styles/app.scss']
        }
      }
    },
    jst: {
      compile: {
        options: {
          processName: function(filepath) {
            var lios = filepath.lastIndexOf('/');
            filepath = filepath.toUpperCase().substring(lios + 1, filepath.length);
            var liop = filepath.lastIndexOf('.');
            return filepath.toUpperCase().substring(0, liop);
          }
        },
        files: {
          'public/assets/js/templates.js': [
            'app/scripts/templates/*.hbs',
            'app/scripts/modals/**/*.hbs'
          ]
        }
      }
    },
    cssmin: {
      app: {
        files: {
          'public/assets/css/app.min.css': [
            'bower_components/normalize.css/normalize.css',
            'bower_components/c3/c3.min.css',
            'public/assets/css/app.css'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          filter: 'isFile',
          flatten: true,
          src: [
            'bower_components/octicons/octicons/*.ttf',
            'bower_components/octicons/octicons/*.woff',
            'bower_components/octicons/octicons/*.svg',
            'bower_components/octicons/octicons/*.eot',

            'bower_components/material-design-icons/iconfont/*.ttf',
            'bower_components/material-design-icons/iconfont/*.woff',
            'bower_components/material-design-icons/iconfont/*.woff2',
            'bower_components/material-design-icons/iconfont/*.svg',
            'bower_components/material-design-icons/iconfont/*.eot',
          ],
          dest: 'public/assets/font'
        }]
      }
    },
    riot: {
      options: {
        concat: true
      },
      dist: {
        src: 'app/scripts/tags/*',
        dest: 'public/assets/js/tags.js'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'app/scripts/lib/**/*.js',
          'app/scripts/app.js',
          'app/scripts/router.js',
          'app/scripts/initialize.js',
          'app/scripts/charts.js',
          'app/scripts/models/*.js',
          'app/scripts/views/**/*.js',
          'app/scripts/modules/*.js',
          'app/scripts/collections/*.js'
        ],
        dest: 'public/assets/js/app.js',
      },
    },
    htmlmin: {
      site: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        },
        files: {
          'public/index.html': 'public/index.html',
          'public/app/index.html': 'public/app/index.html',
          'public/login/index.html': 'public/login/index.html',
          'public/pricing/index.html': 'public/pricing/index.html',
          'public/team/index.html': 'public/team/index.html'
        }
      },
    },
    compress: {
      html: {
        options: {
          mode: 'gzip',
          level: 9
        },
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.html'],
          dest: 'public',
          ext: '.html.gz'
        }]
      },
      js: {
        options: {
          mode: 'gzip'
        },
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.js'],
          dest: 'public',
          ext: '.js.gz'
        }]
      }
    },
    shell: {
      generate_de: {
        command: 'hexo generate --config config_de.yml'
      },
      generate_en: {
        command: 'hexo generate --config config_en.yml'
      },
      deploy: {
        command: ''
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-riot');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'jst', 'riot', 'concat', 'babel', 'uglify', 'copy']);

  grunt.registerTask('site', ['shell:generate_de', 'shell:generate_en', 'shell:deploy']);

  grunt.registerTask('html', ['htmlmin', 'compress']);

  grunt.registerTask('default', ['jst']);
};
