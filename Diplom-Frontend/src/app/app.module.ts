import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './customers/mat-module/mat-module.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { CustomersClient, ProductsClient, OrganizationsClient, WagehousesClient, DealsClient } from './api-service.service';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ListOrganizationComponent } from './organizations/list-organization/list-organization.component';
import { AddOrganizationComponent } from './organizations/add-organization/add-organization.component';
import { EditOrganizationComponent } from './organizations/edit-organization/edit-organization.component';
import { ListWagehouseComponent } from './wagehouses/list-wagehouse/list-wagehouse.component';
import { AddWagehouseComponent } from './wagehouses/add-wagehouse/add-wagehouse.component';
import { EditWagehouseComponent } from './wagehouses/edit-wagehouse/edit-wagehouse.component';
import { ListDealComponent } from './deals/list-deal/list-deal.component';
import { AddDealComponent } from './deals/add-deal/add-deal.component';
import { EditDealComponent } from './deals/edit-deal/edit-deal.component';
import { LoginMenuComponent } from './Autorization/login-menu/login-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    ListOrganizationComponent,
    AddOrganizationComponent,
    EditOrganizationComponent,
    ListWagehouseComponent,
    AddWagehouseComponent,
    EditWagehouseComponent,
    ListDealComponent,
    AddDealComponent,
    EditDealComponent,
    LoginMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatModule,
    ReactiveFormsModule
  ],
  providers: [CustomersClient, ProductsClient, OrganizationsClient, WagehousesClient, DealsClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
