// Requirejs Configuration Options
require.config({
    // to set the default folder
    baseUrl: '../js',
    // paths: maps ids with paths (no extension)
    paths: {
        'jasmine': ['../tests/lib/jasmine-2.4.1/jasmine'],
        'jasmine-html': ['../tests/lib/jasmine-2.4.1/jasmine-html'],
        'jasmine-boot': ['../tests/lib/jasmine-2.4.1/boot']
    },
    // shim: makes external libraries compatible with requirejs (AMD)
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
    require(['../tests/spec/model.specs', '../tests/spec/dom.specs', '../tests/spec/controller.specs'], function () {
        //trigger Jasmine
        window.onload();
    })
});
