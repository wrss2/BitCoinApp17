import { createSelector, createFeatureSelector } from '@ngrx/store';
import {AppState} from "../../models/states";

const selectBitcoinsState = createFeatureSelector<AppState>('states');
export const selectBitcoins  = createSelector(selectBitcoinsState, (state) => state.bitcoins);
export const selectBitcoinsDetailState  = (id:string)  => createSelector(selectBitcoinsState, (state) => state.bitcoins.find(item => item.id === id));
export const selectFavorites  = createSelector(selectBitcoinsState, (state) => state.favoriteList);
export const selectSearchFavorites  = (id:string)  => createSelector(selectBitcoinsState, (state) => state.favoriteList.find(item => item === id));


