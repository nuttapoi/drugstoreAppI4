export class Stock {
  constructor(
    public imageBase64: string,
    public productID: string,
    public businessName: string,
    public unitNameA: string,
    public qtyNowAll: number,
    public latestCost: number,
    public qtyNow: number,
    public qtyActual: number,
    public lotNumber: string,
    public dateExpire: string,
    public fifoIDX: number,
    public saleA: number
  ) {}
}
