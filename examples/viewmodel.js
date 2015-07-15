define([
  'knockout',
  'fineuploader-client/index',
  'uploader-knockout/amd/template/knockout-engine',
  'uploader-requirejs/amd/requirejs-text-loader',
  'uploader-knockout/amd/plugins/knockout-observable',
  'uploader-primary-drag/amd/plugins/primary-drag',
  'require',
  'bootstrap'
], function(ko, Uploader, engine, loader, koPlugin, dragPlugin, require){
    var viewmodel = function viewmodel(){
      this.single = ko.observable();
      this.singleInstance = null;
      this.multiple = ko.observableArray();
      this.multipleInstance = null;
    }

    viewmodel.prototype.attached = function attached(){
      var KnockoutEngine = new engine.KnockoutEngine(ko);
      var RequireJsTextLoader = new loader.RequirejsTextLoader(require);
      var PrimaryDrag = new dragPlugin.PrimaryDrag();
      var SingleKnockoutObservable = new koPlugin.KnockoutObservable(this.single);
      var MultipleKnockoutObservable = new koPlugin.KnockoutObservable(this.multiple);

      this.singleInstance = new Uploader.Uploader({
          container: document.getElementById('single'),
          templatePathOrMarkup: "fineuploader-client-assets/html/uploader.min.html",
          limit: 1,
          url_prefix: "http://laravel-packages.dev",
          messages: {
            completedFile: function(fineUploader, id){
              return fineUploader.getName(id);
            }
          },
          errorHandler: function(error) {console.log("ERROR", error);},
          paths: {
            base_directory: 'products'
          },
          plugins: [
            SingleKnockoutObservable
          ],
          thumbnails: {
            height: 250,
            width: 250
          },
          //confirmDelete: true,
          deleteCheck: function(filename, promise) {
            promise.resolve();
          },
          sessionErrorHandler: function(uploader, i, serverResponse, errorMessage, xhr) {
            console.log(serverResponse);
          }
      }, KnockoutEngine, RequireJsTextLoader);

      this.single("products/55a4cb2715e6d.jpg");

      this.singleInstance.initialize();

      this.multipleInstance = new Uploader.Uploader({
        container: document.getElementById('multiple'),
          fineUploaderOverrides: {
            retry: {
              maxAutoAttempts: 0
            }
          },
          maxFilenameDisplayLength: 5,
          messages: {
            completedFile: function(fineUploader, id){
              return fineUploader.getName(id);
            }
          },
          allowedExtensions: [],
          templatePathOrMarkup: "fineuploader-client-assets/html/uploader.min.html",
          url_prefix: "http://laravel-packages.dev",
          paths: {
            base_directory: 'products'
          },
          session: [
            "products/55a36a5d4bc63.jpg",
            "products/55a363a07352e.jpg"
          ],
          plugins: [
            MultipleKnockoutObservable,
            PrimaryDrag
          ]
      }, KnockoutEngine, RequireJsTextLoader);

      this.multiple.push("products/55a4cb2715e6d.jpg");

      this.multipleInstance.initialize();
    }

    return viewmodel;

});
