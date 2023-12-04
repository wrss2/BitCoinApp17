import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  addToFavorites,
  loadBitCoinsCurrencies,
  loadBitCoinsCurrenciesFailure,
  loadBitCoinsCurrenciesSuccess
} from '../actions/bitcoins.actions';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {BitcoinService} from "../../services/bitcoin.service";
import {from, map, of} from "rxjs";

@Injectable()
export class LoadBitcoinsEffects {
  constructor(
    private actions$: Actions,
    private bitcoinService:BitcoinService
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBitCoinsCurrencies),
      switchMap(() =>
        this.bitcoinService.getBitcoinData().pipe(
          map(bitcoins => {
              return loadBitCoinsCurrenciesSuccess({bitcoins})
          }),
          catchError(error => of(loadBitCoinsCurrenciesFailure({ error })))
        )
      )
    )
  );
}
