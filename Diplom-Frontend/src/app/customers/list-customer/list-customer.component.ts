import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomersClient, Customer } from 'src/app/api-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements AfterViewInit, OnInit {
  customers = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'address', 'phones', 'actions'];
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private customersClient: CustomersClient, private router: Router) { }

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
    this.customersClient.getCustomers().subscribe(response => {
    this.customers.data = response;
    });
  }

  applyFilter(filterValue: string) {
    this.customers.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomer(id: string) {
    this.customersClient.deleteCustomer(id).subscribe(responseFromServer => {
      this.customers.data = this.customers.data.filter(eachItem => eachItem.id !== responseFromServer.id);
    });
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['edit-customer']);
  }

  toAddCustomer() {
    this.router.navigate(['add-customer']);
  }

}
