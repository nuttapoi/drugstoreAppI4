import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from './report.service';
import { PresentToast } from './present-toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ReportService, PresentToast]
})
export class ServicesModule { }
