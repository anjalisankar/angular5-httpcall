import { Component, OnInit } from '@angular/core';
import { Payment } from '.payment'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	
	
	public payment: Payment = {
    accountid: '',
	pmid: '',
	firstname: '',
	middlename: '',
	lastname: '',
	street: '',
	street2: '',
	street3: '',
	city: '',
	state: '',
	zip: '',
	country: '',
  };

  constructor() { }

  ngOnInit() {
  }

}
