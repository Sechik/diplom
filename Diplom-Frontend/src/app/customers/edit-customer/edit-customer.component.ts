import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersClient, Customer } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private customersClient: CustomersClient, private customer: Customer,
              private router: Router) {
    this.editCustomerForm = this.formBuilder.group({
      name: [customer.name, Validators.required],
      address: [customer.address, Validators.required],
      phones: [customer.phones, Validators.required]
    });
   }

  ngOnInit() {
  }

  editCustomer() {
    this.customersClient.putCustomer(this.customer.id, this.editCustomerForm.value).subscribe(data => {
      console.log('yspex');
    });
  }

  toCustomerList() {
    this.router.navigate(['list-customer']);
  }
}
