export class ItemBuy {
  constructor (
    public imageBase64: string,
    public billID: string,
    public ItemNO: number,
    public productID: string,
    public businessName: string,
    public salePrice: number,
    public saleUnitName: string,
    public itemQTY: number,
    public itemValue: number,
  ) {}
}
