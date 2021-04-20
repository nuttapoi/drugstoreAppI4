export class BillHeader {
billID: string;
cusID: string;
saleDate: string;
deliDate: string;
expDate: string;
creditDay: string;
totalPrice: number;
discount100: number;
discountTHB: number;
netSale: number;
payBy: number;
userID: string;
saleNote: string;
ipAddress: string;

constructor() {
 const d = new Date();
 this.billID = '1971030012';
 this.cusID = '99999999';
 this.saleDate = d.toISOString();
 this.deliDate = d.toISOString();
 this.expDate = d.toISOString();
 this.creditDay = '0';
 this.totalPrice = 0;
 this.discount100 = 0;
 this.discountTHB = 0;
 this.netSale = 0;
 this.payBy = 0;
 this.userID = '00000';
 this.ipAddress = '127.0.0.1';
 }
}
