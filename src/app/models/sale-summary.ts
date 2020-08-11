export class SaleSummary {
  constructor(
    public period: Date,
    public customerCount: number,
    public sale: number,
    public profit: number,
    public margin: number,
    public loginName: string
  ) {}
}
