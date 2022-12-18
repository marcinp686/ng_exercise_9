export interface CryptoModel {
    symbol: string;
    priceChange: number;
    priceChangePercent: number;
    weightedAvgPrice: number;
    prevClosePrice: number;
    lastPrice: number;
    lastQty: number;
    bidPrice: number;
    bidQty: number;
    askPrice: number;
    askQty: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    quoteVolume: number;
    openTime: Date;
    closeTime: Date;
    firstId: number;
    lastId: number;
    count: number
  }