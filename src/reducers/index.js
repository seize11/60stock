import { combineReducers } from "redux";

import base from "./base";
import user from "./user";
import account from "./account";
import table from "./table";
import agent from "./agent";
import play from "./play";

const rootReducer = combineReducers({
  base,
  user,
  account,
  table,
  agent,
  play
});

export default rootReducer;
