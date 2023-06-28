import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';

export default class App {
  constructor(target, initialState) {
    this.state = { rootDocument: initialState, currDocument: initialState[0].id };
    this.ListPage = new ListPage(target, this.state.rootDocument, this.onClick);
    this.EditPage = new EditPage(target, this.state.currDocument);
  }

  setCurrDocument = (id) => {
    this.state.currDocument = id;
    this.EditPage.setCurrDocument(id);
  }

  onClick = (id) => {
    this.setCurrDocument(Number(id));
  }
}