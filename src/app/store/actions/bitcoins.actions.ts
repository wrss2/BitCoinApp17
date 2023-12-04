import { createAction, props } from '@ngrx/store';
import {cryptoTick} from "../../models/crypto-tick";
import {AppState} from "../../models/states";
export const loadBitCoinsCurrencies = createAction(
  '[Currencies Load] Load Currencies'
);
export const loadBitCoinsCurrenciesSuccess  = createAction(
  '[Currencies Load Success] Load Currencies Success',
  props<{ bitcoins: cryptoTick[]}>()
);
export const loadBitCoinsCurrenciesFailure = createAction(
  '[Currencies Load Failure] Load Currencies Failure',
  props<{ error: any }>()
);
export const addToFavorites = createAction(
  '[Favorites Add] Add to Favorites',
  props<{ bitCoinId: string }>()
);
export const removeFromFavorites = createAction(
  '[Favorites Remove] Remove From Favorites',
  props<{ bitCoinId: string }>()
);

export const browserReload = createAction(
  '[Browser Reload] Browser Reload',
  props<{  bitcoins: any }>()
);
export const hydrate = createAction("[Hydration] Hydrate");
export const hydrateSuccess = createAction(
  "[Hydration] Hydrate Success",
  props<{ state: AppState }>()
);

export const hydrateFailure = createAction("[Hydration] Hydrate Failure");
