import { CustomersClient } from 'src/app/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm: FormGroup;
  message: string;
  constructor(private formBuilder: FormBuilder, private customersClient: CustomersClient, private router: Router) {
    this.addCustomerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phones: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addCustomer() {
    if (this.addCustomerForm.valid) {
      this.customersClient.postCustomer(this.addCustomerForm.value).subscribe(data => {
        this.message = 'Производитель добавлен';
        this.clearForm();
      });
    } else {
      this.message = 'Производитель не добавлен';
    }
  }

  private clearForm() {
    this.addCustomerForm.setValue(
      { name: '',
        address: '',
        phones: ''
      });
  }

  toCustomerList() {
    this.router.navigate(['list-customer']);
  }
}
