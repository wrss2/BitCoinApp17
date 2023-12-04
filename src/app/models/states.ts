import {cryptoTick, favoriteList} from "./crypto-tick";

export interface AppState {
  bitcoins:cryptoTick[]
  favoriteList: string[]
}

export const initialState: AppState = {
  bitcoins:[],
  favoriteList:[]
};
