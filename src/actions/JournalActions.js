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

export function setActiveJournal(journal) {
  dispatcher.dispatch({
    type: "SET_ACTIVE_JOURNAL",
    payload: {
      journal: journal
    }
  });
}
