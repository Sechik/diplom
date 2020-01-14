import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductsClient, Customer, CustomersClient } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  message: string;
  customer = new FormControl();
  options: Customer[];
  filteredOptions: Observable<Customer[]>;
  constructor(private formBuilder: FormBuilder, private productsClient: ProductsClient, private router: Router,
              private customersClient: CustomersClient) {
                this.addProductForm = this.formBuilder.group({
                  name: ['', Validators.required],
                  cost: ['', Validators.required],
                  customer: ['', Validators.required],
                  customerid: ['', Validators.required],
                  measure: ['']
                });
              }

  ngOnInit() {
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
  // TODO Единицы измерения сделать списком кг., л., шт. и пустую
  addProduct() {
    this.addProductForm.controls.customerid.setValue(this.addProductForm.controls.customer.value.id);
    if (this.addProductForm.valid) {
      this.productsClient.postProduct(this.addProductForm.value).subscribe(data => {
        this.message = 'Продукт добавлен';
      });
    } else {
      this.message = 'Продукт не добавлен';
    }
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }

  toProductList() {
    this.router.navigate(['list-product']);
  }

  private _filter(name: string): Customer[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
