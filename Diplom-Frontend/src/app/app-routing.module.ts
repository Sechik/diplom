import { AddDealComponent } from './deals/add-deal/add-deal.component';
import { ListWagehouseComponent } from './wagehouses/list-wagehouse/list-wagehouse.component';
import { EditWagehouseComponent } from './wagehouses/edit-wagehouse/edit-wagehouse.component';
import { AddWagehouseComponent } from './wagehouses/add-wagehouse/add-wagehouse.component';
import { AddOrganizationComponent } from './organizations/add-organization/add-organization.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrganizationComponent } from './organizations/list-organization/list-organization.component';
import { EditDealComponent } from './deals/edit-deal/edit-deal.component';

const routes: Routes = [
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'add-organization', component: AddOrganizationComponent },
  { path: 'edit-organization', component: EditProductComponent },
  { path: 'list-organization', component: ListOrganizationComponent },
  { path: 'add-wagehouse', component: AddWagehouseComponent },
  { path: 'edit-wagehouse', component: EditWagehouseComponent },
  { path: 'list-wagehouse', component: ListWagehouseComponent },
  { path: 'add-deal', component: AddDealComponent },
  { path: 'edit-deal', component: EditDealComponent },
  { path: 'list-deal', component: ListWagehouseComponent }
  // { path : '', component : ListCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
