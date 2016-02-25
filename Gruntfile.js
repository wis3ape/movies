module.exports = function(grunt) {
    // grunt plugins loader
    require('jit-grunt')(grunt);

    grunt.initConfig({

        clean: {
            all: ['dist/**']
        },

        jshint: {
            options: {
                force: true,
                jshintrc: '.jshintrc'
            },
            all: [
                'src/*.js',
                'src/**/*.js'
            ]
        },

        jscs: {
            options: {
                force: true,
                config: '.jscsrc'
            },
            all: [
                'src/*.js',
                'src/**/*.js'
            ]
        },

        concat: {
            options: {
                separator: ';'
            },
            js: {
                files: {
                    'dist/js/app.js': [
                        'src/**/*.module.js',
                        'src/**/*.js',
                        'src/*.module.js',
                        'src/*.js'
                    ]
                }
            }
        },

        bower_concat: {
            all: {
                dest: 'dist/js/app.dependencies.js',
                cssDest: 'dist/css/app.dependencies.css'
            }
        },

        uglify: {
            options: {
                compress: true,
                sourceMap: true,
                ASCIIOnly: true,
                preserveComments: false
            },
            all: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js'],
                    'dist/js/app.dependencies.min.js': ['dist/js/app.dependencies.js']
                }
            }
        },

        less: {
            all: {
                files: {
                    'dist/css/styles.css': ['src/**/*.less']
                }
            }
        },

        cssmin: {
            all: {
                files: {
                    'dist/css/styles.min.css': 'dist/css/styles.css'
                }
            }
        },

        copy: {
            index: {
                src: 'src/index.html',
                dest: 'dist/index.html'
            }
        },

        wiredep: {
            all: {
                src: 'dist/index.html'
            }
        },

        injector: {
            dev: {
                options: {
                    addRootSlash: false
                },
                files: {
                    'dist/index.html': [
                        'dist/js/*.js',
                        'dist/css/*.css',
                        '!dist/css/*.min.css'
                    ]
                }
            },
            prod: {
                options: {
                    addRootSlash: false
                },
                files: {
                    'dist/index.html': [
                        'dist/js/*.min.js',
                        'dist/css/*.min.css'
                    ]
                }
            }
        },

        watch: {
            app: {
                files: ['src/**'],
                tasks: ['serve-dev']
            }
        },

        express: {
            local: {
                options: {
                    hostname: 'localhost',
                    port: 8008,
                    bases: '.',
                    open: true,
                    server: 'server.js'
                }
            }
        }

    });

    // grunt-contrib-watch must be explicitly loaded for grunt-express to prevent error msg
    grunt.loadNpmTasks('grunt-contrib-watch');

    // analyze js
    grunt.registerTask('analyze', [
        'jshint',
        'jscs'
    ]);

    // minify js
    grunt.registerTask('minify-js', [
        'concat',
        'uglify'
    ]);

    // minify css
    grunt.registerTask('minify-css', [
        'less',
        'cssmin'
    ]);

    // dev
    grunt.registerTask('serve-dev', [
        'clean',
        'minify-css',
        'analyze',
        'concat',
        'copy:index',
        'wiredep',
        'injector:dev',
        'express:local',
        'watch:app'
    ]);

    // prod
    grunt.registerTask('serve-prod', [
        'clean',
        'minify-css',
        'analyze',
        'bower_concat',
        'minify-js',
        'copy:index',
        'injector:prod',
        'express:local',
        'watch:app'
    ]);
}
