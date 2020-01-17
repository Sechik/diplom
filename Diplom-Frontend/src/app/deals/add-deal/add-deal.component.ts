import { Component, OnInit } from '@angular/core';
import { Organization, Product, DealsClient, CustomersClient, OrganizationsClient, ProductsClient } from 'src/app/api-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss']
})
export class AddDealComponent implements OnInit {
  addDealForm: FormGroup;
  message: string;
  orgControl = new FormControl();
  optionsOrg: Organization[];
  filteredOptionsOrg: Observable<Organization[]>;

  prodControl = new FormControl();
  optionsProd: Product[];
  filteredOptionsProd: Observable<Product[]>;
  constructor(private formBuilder: FormBuilder, private dealsClient: DealsClient, private router: Router,
              private organizationsClient: OrganizationsClient, private productsClient: ProductsClient) {
                this.addDealForm = this.formBuilder.group({
                  organization: ['', Validators.required],
                  organizationid: ['', Validators.required],
                  product: ['', Validators.required],
                  productid: ['', Validators.required],
                  date: ['', Validators.required],
                  count: ['', Validators.required],
                  sum: ['', Validators.required]
                });
              }

  ngOnInit() {
    this.organizationsClient.getOrganizations().subscribe(data => {
      this.optionsOrg = data;
      this.filteredOptionsOrg = this.orgControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterOrg(name) : this.optionsOrg.slice())
      );
    });
    this.productsClient.getProducts().subscribe(data => {
      this.optionsProd = data;
      this.filteredOptionsProd = this.prodControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterProd(name) : this.optionsProd.slice())
      );
    });

  }
  // TODO Единицы измерения сделать списком кг., л., шт. и пустую
  addDeal() {
    this.addDealForm.controls.customerid.setValue(this.addDealForm.controls.customer.value.id);
    if (this.addDealForm.valid) {
      this.dealsClient.postDeal(this.addDealForm.value).subscribe(data => {
        this.message = 'Сделка добавлена';
      });
    } else {
      this.message = 'Сделка не добавлена';
    }
  }

  displayFnOrg(customer?: Organization): string | undefined {
    return customer ? customer.name : undefined;
  }

  displayFnProd(customer?: Product): string | undefined {
    return customer ? customer.name : undefined;
  }

  toDealList() {
    this.router.navigate(['list-deal']);
  }

  private _filterOrg(name: string): Organization[] {
    const filterValue = name.toLowerCase();
    return this.optionsOrg.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterProd(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.optionsProd.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
