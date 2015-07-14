requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',
        'uploader': '../dist',

        'fineuploader': 'fine-uploader/_build/fine-uploader',
        'text': 'requirejs-text/text',
        'durandal':'durandal/js',
        'plugins' : 'durandal/js/plugins',
        'transitions' : 'durandal/js/transitions',
        'knockout': 'knockout.js/knockout.debug',
        'jquery': 'jquery/jquery',
        'lodash': 'lodash/lodash',
        'bootstrap': 'bootstrap/dist/js/bootstrap.min'
    },
    shim: {
      'fineuploader': {
        exports: 'qq'
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
