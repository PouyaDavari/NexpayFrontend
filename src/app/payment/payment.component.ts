import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { AppError } from '../../common/app-error';
import { BadRequest } from '../../common/bad-request';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // Dependency injection
  service: PaymentService;
  constructor(paymentService: PaymentService) {
    this.service = paymentService;
  }

  message = '';
  errorMessage = '';

  // form
  form = new FormGroup({
    bsb: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      Validators.pattern('[0-9]{3}-?[0-9]{3}')]),

    accountNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
    ]),

    accountName: new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(2),
  ]),
    reference: new FormControl('', Validators.maxLength(50)),
    Amount: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.maxLength(10)])
  });

  // Form properties
  get bsb() { return this.form.get('bsb'); }
  get accountNumber() { return this.form.get('accountNumber'); }
  get accountName() { return this.form.get('accountName'); }
  get reference() { return this.form.get('reference'); }
  get Amount() { return this.form.get('Amount'); }

  ngOnInit() {
  }

  onSubmit() {
    this.service.postPayment(this.form.value)
    .subscribe(response => {
      this.message = 'Payment added';
    },
    (error: AppError) => {
      if (error instanceof BadRequest) {
        this.errorMessage = 'Bad request';
      } else {
        this.errorMessage = 'unexpected error: ' + error.originalError;
        throw error;
      }
    });

  }

}
