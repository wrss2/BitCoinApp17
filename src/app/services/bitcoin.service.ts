import {Injectable, signal, WritableSignal} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of, Subject} from "rxjs";
import {cryptoTick} from "../models/crypto-tick";

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private data:WritableSignal<any> = signal('');

  private dataSubject = new BehaviorSubject({});
  dataDetails$ = this.dataSubject.asObservable();
  constructor(
    private _http: HttpClient,
    private toastr: ToastrService
  ) { }
  setUrlData(update: cryptoTick) {
    this.data.set(update);
  }
  getUrlData() {
    return this.data;
  }
  getBitcoinData():Observable<cryptoTick[]>{
    return this._http.get<cryptoTick[]>('/db/tickers.json')
  }
  showDetailsPage(cryptoDatails: cryptoTick): void {
    this.dataSubject.next(cryptoDatails);
  }
}
