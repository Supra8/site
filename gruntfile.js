module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      js: {
        files: {
          'themes/v1/source/js/bundle.min.js': [
            'themes/v1/source/js/ga.js',
            'themes/v1/source/js/sign-up.js',
            'themes/v1/source/js/navigation.js'
          ]
        }
      }
    },
    htmlmin: {
      de: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        },
        files: {
          'public/de/index.html': 'public/de/index.html',
          'public/de/404/index.html': 'public/de/404/index.html',
          'public/de/contact/index.html': 'public/de/contact/index.html',
          'public/de/about/index.html': 'public/de/about/index.html',
          'public/de/policies/privacy/index.html': 'public/de/policies/privacy/index.html',
          'public/de/success/registration/index.html': 'public/de/success/registration/index.html',
          'public/de/success/contact/index.html': 'public/de/success/contact/index.html'
        }
      },
      en: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        },
        files: {
          'public/en/index.html': 'public/en/index.html',
          'public/en/404/index.html': 'public/en/404/index.html',
          'public/en/contact/index.html': 'public/en/contact/index.html',
          'public/en/about/index.html': 'public/en/about/index.html',
          'public/en/policies/privacy/index.html': 'public/en/policies/privacy/index.html',
          'public/en/success/registration/index.html': 'public/en/success/registration/index.html',
          'public/en/success/contact/index.html': 'public/en/success/contact/index.html'
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
      clean: {
        command: 'rm ./public -r -f'
      },
      generate_de: {
        command: 'hexo generate --config ./config_de.yml'
      },
      generate_en: {
        command: 'hexo generate --config ./config_en.yml'
      },
      deploy: {
        command: ''
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('site', ['uglify:js', 'shell:clean', 'shell:generate_de', 'shell:generate_en', 'shell:deploy', 'htmlmin']);

  grunt.registerTask('html', ['htmlmin', 'compress']);

  grunt.registerTask('default', ['jst']);
};
