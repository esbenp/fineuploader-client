requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',
        'fineuploader-client': '../dist/amd',
        'fineuploader-client-assets': '../dist/assets',
        'uploader-requirejs': 'fineuploader-client-requirejs/dist',
        'uploader-knockout': 'fineuploader-client-knockout/dist',
        'uploader-primary-drag': 'fineuploader-client-primary-drag/dist',

        'fineuploader': 'fine-uploader/_build/fine-uploader',
        'text': 'requirejs-text/text',
        'durandal':'durandal/js',
        'plugins' : 'durandal/js/plugins',
        'transitions' : 'durandal/js/transitions',
        'knockout': 'knockout/dist/knockout.debug',
        'jquery': 'jquery/dist/jquery',
        'lodash': 'lodash/lodash',
        'bootstrap': 'bootstrap/dist/js/bootstrap.min'
    },
    shim: {
      'fineuploader': {
        exports: 'qq'
      },
      'uploader-knockout/amd/component': {
        deps: ['knockout']
      }
    }
});

requirejs(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/binder'],  function (system, app, viewLocator, binder) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    window.__DEBUG__ = true;

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        // viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('examples/viewmodel');
    });

});
