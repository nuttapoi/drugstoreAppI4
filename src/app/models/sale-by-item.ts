export class SaleByItem {
  constructor(
    public productID: string,
    public businessName: string,
    public unitNameA: string,
    public sale: number,
    public profit: number,
    public itemQTY: number,
    public itemCost: number,
    public profitMargin: number
  ) {}
}

