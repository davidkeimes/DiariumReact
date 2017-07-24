import dispatcher from "../dispatcher/dispatcher";
import { apiEndpoint } from "../config";
import request from "../../node_modules/superagent/superagent";

export function fetchEntries(journalId) {
  dispatcher.dispatch({ type: "FETCH_ENTRIES" });
  request
    .get(apiEndpoint + "/entries/journal/" + journalId)
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "FETCH_ENTRIES_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "FETCH_ENTRIES_SUCCESS",
          payload: {
            response: res.body
          }
        });
      }
    });
}

export function createEntry(name, content, journalId) {
  dispatcher.dispatch({ type: "CREATE_ENTRY" });
  request
    .post(apiEndpoint + "/entries")
    .send({ name: name, content: content, journal: journalId })
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "CREATE_ENTRY_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "CREATE_ENTRY_SUCCESS",
          payload: {
            response: res.body
          }
        });
      }
    });
}

export function setActiveEntry(entry) {
  dispatcher.dispatch({
    type: "SET_ACTIVE_ENTRY",
    payload: {
      entry: entry
    }
  });
}

