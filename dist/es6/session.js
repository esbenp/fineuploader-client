import {isString, guid} from './utilities';

export class Session {
  constructor(uploader){
    this._session = null;
    this._uploader = uploader;

    this.setSession(this._uploader.settings.session);
  }

  getSession() {
    return this._session;
  }

  setSession(session) {
    this._session = session;
  }

  mapSession(session) {
    if (isString(session)) {
      session = [session];
    }

    return session;
  }
}
