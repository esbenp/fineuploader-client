export class PrimaryDrag {
  setupListeners(){
    this.uploader.listen('onComplete', this._onComplete);
  }

  _onComplete() {
    console.log(arguments);
  }

  __setUploader(uploader){
    this.uploader = uploader;

    this.setupListeners();
  }

}
