import { combineReducers } from "redux";
import adminReducer from "./adminReducers";
import cmsUserReducer from "./cmsUserReducers";
import loginReducer from "./loginReducers";
import userReducer from "./userReducer";
import videoReducer from "./videoedukasiReducers";
import artikelReducer from "./artikelReducers";

export default combineReducers({
  isLogin: loginReducer,
  Admin: adminReducer,
  CmsUsers: cmsUserReducer,
  Users: userReducer,
  Videos: videoReducer,
  Artikels: artikelReducer,
});
