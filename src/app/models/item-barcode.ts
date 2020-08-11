export class ItemBarcode {
  constructor(
    public productID: string,
    public businessName: string,
    public imageBase64: string,
    public unitNameS: string,
    public saleBarcode: string,
    public barcodeOnly: boolean
  ) {}
}
