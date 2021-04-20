export class ItemCheck {
  constructor(
    public returnID: string,
    public productID: string,
    public businessName: string,
    public unitNameA: string,
    public unitNameX: number,
    public returnQty: number,
    public resultQty: number,
    public diffQty: number,
  ) {}
}
