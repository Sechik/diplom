import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  // { path : '', component : ListCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
