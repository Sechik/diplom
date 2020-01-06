import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './customers/mat-module/mat-module.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { CustomersClient } from './api-service.service';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatModule,
    ReactiveFormsModule
  ],
  providers: [CustomersClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
