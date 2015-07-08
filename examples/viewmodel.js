define(['knockout', 'uploader/amd/index', 'require'], function(ko, Uploader, require){
    var viewmodel = function viewmodel(){

    }

    viewmodel.prototype.attached = function attached(){
      var KnockoutEngine = new Uploader.engines.knockout(ko);
      var RequireJsTextLoader = new Uploader.loaders.requireJsText(require);

      /*this.single = new Uploader.Uploader({
          container: document.getElementById('single'),
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html",
          limit: 1,
          url_prefix: "http://laravel-packages.dev",
          paths: {
            base_directory: 'products'
          }
      }, KnockoutEngine, RequireJsTextLoader);

      this.single.initialize();
*/
      this.multiple = new Uploader.Uploader({
          container: document.getElementById('multiple'),
          fineUploaderOverrides: {
            retry: {
              maxAutoAttempts: 0
            }
          },
          maxFilenameDisplayLength: 5,
          messages: {
            completedUpload: function(fineUploader, id){
              return fineUploader.getName(id);
            }
          },
          allowedExtensions: [],
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html",
          url_prefix: "http://laravel-packages.dev",
          paths: {
            base_directory: 'products'
          }
      }, KnockoutEngine, RequireJsTextLoader);

      this.multiple.initialize();
    }

    return viewmodel;

});
