import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Organization, Product, DealsClient, OrganizationsClient, ProductsClient } from 'src/app/api-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.scss']
})
export class EditDealComponent implements OnInit {
  editDealForm: FormGroup;
  message: string;
  orgControl = new FormControl();
  optionsOrg: Organization[];
  filteredOptionsOrg: Observable<Organization[]>;

  prodControl = new FormControl();
  optionsProd: Product[];
  filteredOptionsProd: Observable<Product[]>;
  constructor(private formBuilder: FormBuilder, private dealsClient: DealsClient, private router: Router,
              private organizationsClient: OrganizationsClient, private productsClient: ProductsClient) {
                this.editDealForm = this.formBuilder.group({
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
  editDeal() {
    this.editDealForm.controls.customerid.setValue(this.editDealForm.controls.customer.value.id);
    if (this.editDealForm.valid) {
      this.dealsClient.postDeal(this.editDealForm.value).subscribe(data => {
        this.message = 'Сделка изменена';
      });
    } else {
      this.message = 'Сделка не изменена';
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
