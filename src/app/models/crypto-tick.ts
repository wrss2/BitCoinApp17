export class cryptoTick {
    id:string = ''
    name:string = ''
    rank:number = 0
    symbol:string = ''
    total_supply:number = 0
    beta_value:number = 0
    circulating_supply:number = 0
    first_data_at:string = ''
    max_supply:number = 0
    favorite:boolean = false
    last_updated:string = ''
    quotes:quotesCryptoTick = {};
}

export class quotesCryptoTick {
    [currencyCode: string]: {
        ath_date: string
        ath_price: number
        market_cap: number
        market_cap_change_24h: number
        percent_change_1h: number
        percent_change_1y: number
        percent_change_6h: number
        percent_change_7d: number
        percent_change_12h: number
        percent_change_15m: number
        percent_change_24h: number
        percent_change_30d: number
        percent_change_30m: number
        percent_from_price_ath: number
        price: number
        volume_24h: number
        volume_24h_change_24h: number
    }
}


export class favoriteList {

}

