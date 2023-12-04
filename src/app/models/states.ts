import {cryptoTick, favoriteList} from "./crypto-tick";

export interface AppState {
  bitcoins:cryptoTick[]
  favoriteList: string[]
  isLoading:boolean
  errors?:string | null
}

export const initialState: AppState = {
  bitcoins:[],
  favoriteList:[],
  isLoading:false,
  errors:null
};
