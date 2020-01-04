import { MatModule } from './../mat-module/mat-module.module';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersClient, Customer } from 'src/app/api-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  customers = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'address', 'phones', 'actions'];

  constructor(private httpClient: HttpClient) {
    new CustomersClient(httpClient).getCustomers().subscribe(response => {
      this.customers =  new MatTableDataSource(response);
    });
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    //this.customers.paginator = this.paginator;
    //this.customers.sort = this.sort;
  }

  ngAfterViewInit() {
    this.customers.sort = this.sort;
    this.customers.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.customers.filter = filterValue.trim().toLowerCase();
  }

}
