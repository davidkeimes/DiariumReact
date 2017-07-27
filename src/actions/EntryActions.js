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

export function fetchEntry(eId) {
  dispatcher.dispatch({ type: "FETCH_ENTRY" });
  request
    .get(apiEndpoint + "/entries/" + eId)
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "FETCH_ENTRY_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "FETCH_ENTRY_SUCCESS",
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

export function saveEntry(entry) {
  dispatcher.dispatch({ type: "SAVE_ENTRY" });
  request
    .put(apiEndpoint + "/entries/" + entry._id)
    .send(entry)
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "SAVE_ENTRY_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "SAVE_ENTRY_SUCCESS",
          payload: {
            response: res.body
          }
        });
      }
    });
}

export function deleteEntry(entry) {
  dispatcher.dispatch({ type: "DELETE_ENTRY" });
  request
    .delete(apiEndpoint + "/entries/" + entry._id)
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "DELETE_ENTRY_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "DELETE_ENTRY_SUCCESS",
          payload: {
            entry: entry 
          }
        });
      }
    });
}

export function searchEntries(search, journal) {
  dispatcher.dispatch({ type: "SEARCH_ENTRIES" });
  request
    .post(apiEndpoint + "/entries/search")
    .send({search: search, journal: journal._id})
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "SEARCH_ENTRIES_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "SEARCH_ENTRIES_SUCCESS",
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

