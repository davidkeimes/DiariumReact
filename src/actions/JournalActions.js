import dispatcher from "../dispatcher/dispatcher";
import { apiEndpoint } from "../config";
import request from "../../node_modules/superagent/superagent";

export function fetchJournals() {
  dispatcher.dispatch({ type: "FETCH_JOURNALS" });
  request
    .get(apiEndpoint + "/journals")
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "FETCH_JOURNALS_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "FETCH_JOURNALS_SUCCESS",
          payload: {
            response: res.body
          }
        });
      }
    });
}

export function createJournal(name, img_url) {
  dispatcher.dispatch({ type: "CREATE_JOURNAL" });
  request
    .post(apiEndpoint + "/journals")
    .send({ name: name, img_url: img_url })
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "CREATE_JOURNAL_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "CREATE_JOURNAL_SUCCESS",
          payload: {
            response: res.body
          }
        });
      }
    });
}

export function deleteJournal(journal) {
  dispatcher.dispatch({ type: "DELETE_JOURNAL" });
  request
    .delete(apiEndpoint + "/journals/" + journal._id)
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "DELETE_JOURNAL_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "DELETE_JOURNAL_SUCCESS",
          payload: {
            journal: journal 
          }
        });
      }
    });
}

export function searchJournals(search) {
  dispatcher.dispatch({ type: "SEARCH_JOURNALS" });
  request
    .post(apiEndpoint + "/journals/search")
    .send({search: search})
    .end(function (err, res) {
      if (err || !res.ok) {
        dispatcher.dispatch({ type: "SEARCH_JOURNALS_ERROR" });
      } else {
        dispatcher.dispatch({
          type: "SEARCH_JOURNALS_SUCCESS",
          payload: {
            response: res.body 
          }
        });
      }
    });
}

export function setActiveJournal(journal) {
  dispatcher.dispatch({
    type: "SET_ACTIVE_JOURNAL",
    payload: {
      journal: journal
    }
  });
}
