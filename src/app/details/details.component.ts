import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BitcoinService} from "../services/bitcoin.service";
import {TextTransformPipe} from "../pipes/text-transform.pipe";
import {LocalStringPipe} from "../pipes/local-string.pipe";
import {Store} from "@ngrx/store";
import {AppState} from "../models/states";
import {selectBitcoinsDetailState} from "../store/selectors/bitcoins.selectors";
import {filter} from "rxjs";
import {loadBitCoinsCurrencies} from "../store/actions/bitcoins.actions";
import {cryptoTick} from "../models/crypto-tick";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,TextTransformPipe,LocalStringPipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class CryptoDetailComponent implements  OnInit{

  id:string = '';
  currencyId:string = 'USD';
  detailsData:cryptoTick = new cryptoTick();
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private bitcoinService:BitcoinService,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.params['id'];
    this.store.select(selectBitcoinsDetailState(this.id)).subscribe((details) => {
      if (details) {
        this.detailsData = details;
      }
    });

   // Inne wersje ładowania strony szczegółowej
   // this.detailsData = this.router.getCurrentNavigation()?.extras.state
   //   let dataSingal = this.bitcoinService.getUrlData()
   //  effect(() => {
   //    this.detailsData2 = dataSingal()
   //  });
   //  this.bitcoinService.dataDetails$.subscribe(dataDetails => {
   //    this.detailsData = dataDetails
   //  });
  }

  ngOnInit(){
  }

  checkType(value:any){
    return typeof value;
  }
}
