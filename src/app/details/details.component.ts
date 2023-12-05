import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CommonModule, CurrencyPipe, DatePipe, PercentPipe} from "@angular/common";
import {BitcoinService} from "../services/bitcoin.service";
import {TextTransformPipe} from "../pipes/text-transform.pipe";
import {LocalStringPipe} from "../pipes/local-string.pipe";
import {Store} from "@ngrx/store";
import {AppState} from "../models/states";
import {selectBitcoinsDetailState} from "../store/selectors/bitcoins.selectors";
import {filter, map, Observable} from "rxjs";
import {loadBitCoinsCurrencies} from "../store/actions/bitcoins.actions";
import {cryptoTick} from "../models/crypto-tick";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,TextTransformPipe,LocalStringPipe
  ],
  providers: [PercentPipe,LocalStringPipe,DatePipe,CurrencyPipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class CryptoDetailComponent implements  OnInit{

  id:string = '';
  currencyId:string = 'USD';
  dateFormat:string = 'yyyy-MM-dd';
  detailsData:cryptoTick = new cryptoTick();
  detailsData$:Observable<cryptoTick | undefined>;
  regularNumbers:string[] = ['beta_value','ath_price','price','volume_24h', 'volume_24h_change_24h']
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private bitcoinService:BitcoinService,
    private percentPipe: PercentPipe,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private localStringPipe: LocalStringPipe,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.params['id'];

    // Inne wersje ładowania strony szczegółowej
    // this.store.select(selectBitcoinsDetailState(this.id)).subscribe((details) => {
    //   if (details) {
    //     this.detailsData = details;
    //   }
    // });

    // this.detailsData = this.router.getCurrentNavigation()?.extras.state
    //   let dataSingal = this.bitcoinService.getUrlData()
    //  effect(() => {
    //    this.detailsData2 = dataSingal()
    //  });
    //  this.bitcoinService.dataDetails$.subscribe(dataDetails => {
    //    this.detailsData = dataDetails
    //  });


    this.detailsData$ = this.store.select(selectBitcoinsDetailState(this.id)).pipe(
      map((detailsCurrency)=>{
        let transformedDetails: any = {};
        if(detailsCurrency) {
          for (let [key, value] of Object.entries(detailsCurrency)) {
            if(typeof value !== 'object' && typeof value !== 'boolean') {
              transformedDetails[key] = this.formatField(key, value)
            } else if (typeof value === 'object'){
              transformedDetails['quotes'] = []
              transformedDetails['quotes'][this.currencyId] = {}
              for (let [key, value] of Object.entries(detailsCurrency['quotes'][this.currencyId])) {
                transformedDetails['quotes'][this.currencyId][key] = this.formatField(key, value)
              }
            }
          }
        }
       return transformedDetails
      })
    )
  }

  ngOnInit(){
  }

  formatField(key: string, value: any): any {
       if(Number.isInteger(value)){
         return this.localStringPipe.transform(value,0)
       } else if(typeof value === 'string') {
         let isDate = !isNaN((new Date(value).getTime()));
         if(isDate){
           return this.datePipe.transform(value, this.dateFormat)
         }
         return value
       } else {
          if(this.regularNumbers.includes(key)){
            if(key == 'price'){
              return this.localStringPipe.transform(this.currencyPipe.transform(value,this.currencyId),2)
            }
            return this.localStringPipe.transform(value,2)
          }
         return  this.percentPipe.transform(value)
       }

  }
}
