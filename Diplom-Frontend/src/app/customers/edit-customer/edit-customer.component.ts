import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersClient, Customer } from 'src/app/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private customersClient: CustomersClient,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.editCustomerForm = this.formBuilder.group({
      id: [this.activatedRoute.snapshot.queryParamMap.get('id'), null],
      name: [this.activatedRoute.snapshot.queryParamMap.get('name'), Validators.required],
      address: [this.activatedRoute.snapshot.queryParamMap.get('address'), Validators.required],
      phones: [this.activatedRoute.snapshot.queryParamMap.get('phones'), Validators.required]
    });
   }

  ngOnInit() {
  }

  editCustomer() {
    if (this.editCustomerForm.valid) {
      this.customersClient.putCustomer(this.editCustomerForm.get('id').value, this.editCustomerForm.value).subscribe(data => {
        this.message = 'Производитель изменен';
      });
    } else {
      this.message = 'Производитель не изменен';
    }
  }

  toCustomerList() {
    this.router.navigate(['list-customer']);
  }
}
