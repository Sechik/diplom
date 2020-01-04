import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatModule } from './customers/mat-module/mat-module.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { CustomersClient } from './api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ListCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatModule
  ],
  providers: [CustomersClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
