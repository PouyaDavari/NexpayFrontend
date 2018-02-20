import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { PaymentModel } from '../models/PaymentModel';
import { BadRequest } from '../common/bad-request';
import { AppError } from '../common/app-error';

@Injectable()
export class PaymentService {

  baseUrl = 'http://localhost:7474/api/payment/';

  // Dependency injection
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  // Post
  postPayment(payment: PaymentModel) {
    return this.http.post(this.baseUrl + 'post', payment)
      .map(response => response.json())
      .catch(this.handleError);
  }

  // handled errors
  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadRequest(error.json()));
    }

    return Observable.throw(new AppError(error));
  }
}
