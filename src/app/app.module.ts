import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from '../common/app-error-handler';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PaymentComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: '**',
        component: PaymentComponent
      }
    ])
  ],
  providers: [
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
