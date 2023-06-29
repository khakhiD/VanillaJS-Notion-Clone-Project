import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
export default class EditorStore {
  constructor({ initialState }) {
    this.state = initialState;
  }

  setDocumentId(id) {
    this.state.documentId = id;
    this._update();
  }

  setDocument(document) {
    this.state.document = document;
    this._update();
  }

  _update() {
    const { state } = this;

    storage.setItem(DOCUMENT(state.documentId), state.document);

    // TODO: API 요청을 디바운스로 해야합니다.
  }
}