import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";

class EntryStore extends EventEmitter {
  constructor() {
    super();
    this.entries = [];
    this.activeEntry = null;
  }

  getEntries() {
    return this.entries;
  }

  getActiveEntry() {
    return this.activeEntry;
  }

  createEntry(entry) {
    this.entries.push(entry);
    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "FETCH_ENTRIES_SUCCESS":
        this.entries = action.payload.response;
        this.emit("change");
        break;
      case "CREATE_ENTRY_SUCCESS":
        this.createEntry(action.payload.response);
        break;
      case "SET_ACTIVE_ENTRY":
        this.activeEntry = action.payload.entry;
        break;
      default:
        break;
    }
  }
}

const entryStore = new EntryStore();
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;