import {Component,  OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LocalStringPipe} from "../pipes/local-string.pipe";
import {cryptoTick} from "../models/crypto-tick";
import {BitcoinService} from "../services/bitcoin.service";
import { Observable} from "rxjs";
import {Router} from "@angular/router";
import { Store} from '@ngrx/store';
import {addToFavorites, hydrate, loadBitCoinsCurrencies} from "../store/actions/bitcoins.actions";
import {selectBitcoins} from "../store/selectors/bitcoins.selectors";
import {AppState} from "../models/states";
import data from '../../db/tickers.json';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, LocalStringPipe, ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements OnInit{

  // Inne wersja ładowania listy
  //cryptoNotowania:cryptoTick[] = data as cryptoTick[];

  currencyId:string = 'USD';
  tabelaData$:Observable<cryptoTick[]>;
  constructor(
    private router: Router,
    private bitcoinService:BitcoinService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadBitCoinsCurrencies());
  }

  ngOnInit(){
    this.tabelaData$ = this.store.select(selectBitcoins);
  }
  rowClick(event: Event,cryptoCurrency:cryptoTick){
    const target = event.target as HTMLElement;
    if( !target.classList.contains("star-button") &&
        !target.classList.contains("rank-header") &&
        target.tagName.toLowerCase() != 'i'){
      this.bitcoinService.showDetailsPage(cryptoCurrency);
      this.bitcoinService.setUrlData({ ...cryptoCurrency });
      this.router.navigate(['/Notowania',cryptoCurrency.id], { state: { ...cryptoCurrency } })
    }
  }

  toggleFavorite(bitCoinId:string){
    this.store.dispatch(addToFavorites({bitCoinId}));
  }
  testSelector(){
    this.tabelaData$ = this.store.select((state: AppState) => state.bitcoins);
    this.tabelaData$.subscribe((data)=>{
      console.log("data", data)
    })
  }

  // Inne wersja dodawania do ulubionych
  //toggleFavorite(bitCoinId:string) {
    //this.store.dispatch(addToFavorites({bitCoinId}));
    // this.cryptoNotowania.map((item)=>{
    //     if(item.id === id){
    //       item.favorite = !item.favorite;
    //     }
    // })
  //}
}
