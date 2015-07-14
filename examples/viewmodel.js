define([
  'knockout',
  'uploader/amd/index',
  'require',
  'bootstrap'
], function(ko, Uploader, require){
    var viewmodel = function viewmodel(){
      this.single = ko.observable();
      this.singleInstance = null;
      this.multiple = ko.observableArray();
      this.multipleInstance = null;
    }

    viewmodel.prototype.attached = function attached(){
      var KnockoutEngine = new Uploader.engines.knockout(ko);
      var RequireJsTextLoader = new Uploader.loaders.requireJsText(require);
      var PrimaryDrag = new Uploader.plugins.primaryDrag();
      var SingleKnockoutObservable = new Uploader.plugins.knockoutObservable(this.single);
      var MultipleKnockoutObservable = new Uploader.plugins.knockoutObservable(this.multiple);

      this.singleInstance = new Uploader.Uploader({
          container: document.getElementById('single'),
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html",
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
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html",
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
