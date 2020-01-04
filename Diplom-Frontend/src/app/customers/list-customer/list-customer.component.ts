import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomersClient, Customer } from 'src/app/api-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements AfterViewInit, OnInit {
  customers = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'address', 'phones', 'actions'];
  customersClient: CustomersClient;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private httpClient: HttpClient) {
    this.customersClient = new CustomersClient(httpClient);
    this.customersClient.getCustomers().subscribe(response => {
      this.customers =  new MatTableDataSource(response);
    });
  }

  @ViewChild(MatPaginator, {static: false}) set setPaginator(paginator: MatPaginator) {
    this.customers.paginator = paginator;
  }

  @ViewChild(MatSort, {static: false}) set setSort(sort: MatSort) {
     this.customers.sort = sort;
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  ngOnInit() {
  }


  applyFilter(filterValue: string) {
    this.customers.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomer(id: string) {
    this.customersClient.deleteCustomer(id);
  }

}
