import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";

class JournalStore extends EventEmitter {
  constructor() {
    super();
    this.journals = [];
    this.activeJournal = null;
  }

  getJournals() {
    return this.journals;
  }

  createJournal(journal) {
    this.journals.push(journal);
    this.emit("change");
  }

  getActiveJournal() {
    return this.activeJournal;
  }

  deleteJournal(journal) {
    var toDelete = this.journals.find(j => j._id == journal._id);
    this.journals.splice(this.journals.indexOf(toDelete) , 1);
    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "FETCH_JOURNALS_SUCCESS":
        this.journals = action.payload.response;
        this.emit("change");
        break;
      case "CREATE_JOURNAL_SUCCESS":
        this.createJournal(action.payload.response);
        break;
      case "SET_ACTIVE_JOURNAL":
        this.activeJournal = action.payload.journal;
        this.emit("change");
        break;
      case "DELETE_JOURNAL_SUCCESS":
        this.deleteJournal(action.payload.journal);
        break;
      case "SEARCH_JOURNALS_SUCCESS":
        this.journals = action.payload.response;
        this.emit("change");
        break;
      default:
        break;
    }
  }
}

const journalStore = new JournalStore();
dispatcher.register(journalStore.handleActions.bind(journalStore));

export default journalStore;