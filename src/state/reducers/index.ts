import { combineReducers } from "redux";
import cellReducer from "./cellReducer";
import bundlesReducer from './bundleReducer';

const reducers = combineReducers({
  cell: cellReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
