import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter } from '@angular/router';
import {routes } from './app.routes';
import {provideStore, StoreModule} from '@ngrx/store';
import {ToastrModule} from "ngx-toastr";
import {LoadBitcoinsEffects} from "./store/effects/loadBitcoins.effects";
import {metaReducers, reducers} from "./store/reducers/bitcoins.reducer";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {DatePipe, DecimalPipe} from "@angular/common";
import {BitcoinService} from "./services/bitcoin.service";
import {provideHttpClient} from "@angular/common/http";



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideHttpClient(),
    BitcoinService,
    { provide: LOCALE_ID, useValue: 'en-US' },
    importProvidersFrom(
      ToastrModule.forRoot(),
      DecimalPipe,
      DatePipe,
      StoreModule.forRoot(reducers, {metaReducers} ),
      StoreDevtoolsModule.instrument({
        maxAge: 50,
      //  logOnly: true,
      }),
      EffectsModule.forRoot([LoadBitcoinsEffects]),
    )
  ]
};
