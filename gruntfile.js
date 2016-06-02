module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
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
    htmlmin: {
      de: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        },
        files: {
          'public/de/index.html': 'public/de/index.html',
          'public/de/login/index.html': 'public/de/login/index.html',
          'public/de/contact/index.html': 'public/de/contact/index.html',
          'public/de/about/index.html': 'public/de/about/index.html'
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
          'public/en/login/index.html': 'public/en/login/index.html',
          'public/en/contact/index.html': 'public/en/contact/index.html',
          'public/en/about/index.html': 'public/en/about/index.html'
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('site', ['shell:clean', 'shell:generate_de', 'shell:generate_en', 'shell:deploy', 'htmlmin']);

  grunt.registerTask('html', ['htmlmin', 'compress']);

  grunt.registerTask('default', ['jst']);
};
