export class ItemBarcode {
  constructor(
    public productID: string,
    public businessName: string,
    public imageBase64: string,
    public unitNameS: string,
    public saleA: number,
    public saleBarcode: string,
    public barcodeOnly: boolean
  ) {}
}
