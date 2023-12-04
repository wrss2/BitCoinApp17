import {ActionReducer, ActionReducerMap, createReducer, INIT, MetaReducer, on, State} from '@ngrx/store';
import {AppState, initialState} from '../../models/states';
import {
  addToFavorites, browserReload, loadBitCoinsCurrencies, loadBitCoinsCurrenciesFailure,
  loadBitCoinsCurrenciesSuccess,
  removeFromFavorites
} from "../actions/bitcoins.actions";
import {cryptoTick, favoriteList} from "../../models/crypto-tick";
import _ from "lodash";

export const bitcoinReducer = createReducer(
  initialState,
  on(loadBitCoinsCurrencies, (state, action) => ({...state,isLoading:true})),
  on(loadBitCoinsCurrenciesFailure, (state, action) => ({...state,isLoading:false, errors:"Load BitCoins List Error"})),
  on(loadBitCoinsCurrenciesSuccess, (state,action) => {
      const storageValue = localStorage.getItem("state");
       if (storageValue) {
         try{
           let store = JSON.parse(storageValue);
           if(store?.states?.bitcoins?.length > 0){
             return ({...state, bitcoins: store.states.bitcoins, isLoading:false, errors: "No errors"})
           }
         } catch {
             localStorage.removeItem("state");
         }
      }
      return ({...state, bitcoins:action.bitcoins,isLoading:false})
  }),
  on(addToFavorites, (state,action ) => {
    let index = state.bitcoins.findIndex((item)=> item.id == action.bitCoinId)
    if (index !== -1) {
      //const copyBitcoins:cryptoTick[] = _.cloneDeep(state.bitcoins);
      const updatedBitcoins = [...state.bitcoins];
      updatedBitcoins[index] = { ...updatedBitcoins[index], favorite: !updatedBitcoins[index].favorite };
      return { ...state, bitcoins: updatedBitcoins };
    }
    return { ...state}
  }),
  on(removeFromFavorites, (state, {bitCoinId}) => ({
    ...state,
    favoriteList: state.favoriteList.filter((item) => item !== bitCoinId),
  }))
);
export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return (state, action) => {
    if (action.type === INIT) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};

export const reducers: ActionReducerMap<{states:any }> = {
  states: bitcoinReducer
}
export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]
