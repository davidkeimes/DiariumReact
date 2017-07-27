import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";

class EntryStore extends EventEmitter {
  constructor() {
    super();
    this.entries = [];
    this.activeEntry = {content: ""};
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

  updateEntries(entry) {
    var toUpdate = this.entries.find(e => e._id == entry._id);
    this.entries[this.entries.indexOf(toUpdate)] = entry;
  }

  deleteEntry(entry) {
    var toDelete = this.entries.find(e => e._id == entry._id);
    this.entries.splice(this.entries.indexOf(toDelete), 1);
  }

  handleActions(action) {
    switch (action.type) {
      case "FETCH_ENTRIES_SUCCESS":
        this.entries = action.payload.response;
        this.emit("change");
        break;
      case "FETCH_ENTRY_SUCCESS":
        this.activeEntry = action.payload.response;
        this.emit("change");
        break;  
      case "CREATE_ENTRY_SUCCESS":
        this.createEntry(action.payload.response);
        break;
      case "SET_ACTIVE_ENTRY":
        this.activeEntry = action.payload.entry;
        this.emit("change");
        break;
      case "SAVE_ENTRY_SUCCESS":
        this.activeEntry = action.payload.response;
        this.updateEntries(action.payload.response);
        break;
      case "DELETE_ENTRY_SUCCESS":
        this.deleteEntry(action.payload.entry);
        this.emit("change");
        break;
      case "SEARCH_ENTRIES_SUCCESS":
        this.entries = action.payload.response;
        this.emit("change");
      default:
        break;
    }
  }
}

const entryStore = new EntryStore();
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;