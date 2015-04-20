module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // complile sass to css
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/style.sass'
                }
            }
        },

        autoprefixer: {
            single_file: {
                src: 'css/style.css',
                dest: 'css/style.css'
            }
        },
        
        // concats js files into one
        concat: {
            dist: {
                src: '',
                dest: ''
            }
        },
        
        // minifies concated js file
        uglify: {
            build: {
                src: '',
                dest: ''
            }
        },

        // cleans directory
        clean: [  ],

        // runs a PHP server
        php: {
            dist: {
                options: {
                    port: 5000,
                    keepalive: true
                }
            }
        },

        // watches for changes
        watch: {
            scripts: {
                files: [ '*.html', 'sass/*' ],
                tasks: [ 'sass', 'autoprefixer' ],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [ 'watch' ]); 
    grunt.registerTask('serve', [ 'php' ]);
}
