define(['knockout', 'uploader/amd/index', 'require'], function(ko, Uploader, require){
    var viewmodel = function viewmodel(){

    }

    viewmodel.prototype.attached = function attached(){
      var KnockoutEngine = new Uploader.engines.knockout(ko);
      var RequireJsTextLoader = new Uploader.loaders.requireJsText(require);

      this.single = new Uploader.Uploader({
          container: document.getElementById('single'),
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html",
          limit: 1
      }, KnockoutEngine, RequireJsTextLoader);

      this.single.initialize();

      this.multiple = new Uploader.Uploader({
          container: document.getElementById('multiple'),
          templatePathOrMarkup: "uploader/assets/html/uploader.min.html"
      }, KnockoutEngine, RequireJsTextLoader);

      this.multiple.initialize();
    }

    return viewmodel;

});
