import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsClient, CustomersClient, Customer } from 'src/app/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  message: string;
  customer = new FormControl();
  options: Customer[];
  filteredOptions: Observable<Customer[]>;
  constructor(private formBuilder: FormBuilder, private productsClient: ProductsClient, private router: Router,
              private activatedRoute: ActivatedRoute, private customersClient: CustomersClient) {
      this.editProductForm = this.formBuilder.group({
      id: [this.activatedRoute.snapshot.queryParamMap.get('id')],
      name: [this.activatedRoute.snapshot.queryParamMap.get('name')],
      cost: [this.activatedRoute.snapshot.queryParamMap.get('cost')],
      customer: [this.activatedRoute.snapshot.queryParamMap.get('customer')],
      customerid: [this.activatedRoute.snapshot.queryParamMap.get('customerid')],
      measure: [this.activatedRoute.snapshot.queryParamMap.get('measure')]
    });
  }

  ngOnInit() {
    this.editProductForm.controls.customer.setValue(this.activatedRoute.snapshot.queryParamMap.get('customer'));
    this.customersClient.getCustomers().subscribe(data => {
      this.options = data;
      this.filteredOptions = this.customer.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    });
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }

  editProduct() {
    this.editProductForm.controls.customerid.setValue(this.editProductForm.controls.customer.value.id);
    if (this.editProductForm.valid) {
      this.productsClient.putProduct(this.editProductForm.get('id').value, this.editProductForm.value).subscribe(data => {
        this.message = 'Товар/услуга изменена';
      });
    } else {
      this.message = 'Товар/услуга не изменена';
    }
  }

  toProductList() {
    this.router.navigate(['list-product']);
  }

  private _filter(name: string): Customer[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
