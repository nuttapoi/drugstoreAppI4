export class ItemReceive {
  constructor(
    public imageBase64: string,
    public receiveID: string,
    public ItemNO: number,
    public productID: string,
    public businessName: string,
    public unitPrice: number,
    public itemValue: number,
    public unitNameA: string,
    public qtyReceive: number,
    public lotNumber: string,
    public dateExpire: Date
  ) {}
}
