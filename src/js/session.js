import {isString, guid} from './utilities';

export class Session {
  constructor(){

  }

  mapSession(files) {
    if (isString(files)) {
      files = [files];
    }

    return files.map(function(file){
      return {
        name: file.split('/')[1],
        type: 'session',
        uuid: guid()
      }
    });
  }
}
