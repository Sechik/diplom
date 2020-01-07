import { WagehousesClient, Wagehouse, Customer } from './../../api-service.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-wagehouse',
  templateUrl: './list-wagehouse.component.html',
  styleUrls: ['./list-wagehouse.component.scss']
})
export class ListWagehouseComponent implements OnInit, AfterViewInit {

  wagehouses = new MatTableDataSource<Wagehouse>();
  displayedColumns: string[] = ['id', 'product', 'count', 'status', 'actions'];
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private wagehousesClient: WagehousesClient, private router: Router) { }

  @ViewChild(MatPaginator, {static: false}) set setPaginator(paginator: MatPaginator) {
    this.wagehouses.paginator = paginator;
  }

  @ViewChild(MatSort, {static: false}) set setSort(sort: MatSort) {
     this.wagehouses.sort = sort;
  }

  ngAfterViewInit() {
    this.wagehouses.paginator = this.paginator;
    this.wagehouses.sort = this.sort;
  }

  ngOnInit() {
    this.wagehousesClient.getWagehouses().subscribe(response => {
    this.wagehouses.data = response;
    });
  }

  applyFilter(filterValue: string) {
    this.wagehouses.filter = filterValue.trim().toLowerCase();
  }

  deleteWagehouse(id: string) {
    this.wagehousesClient.deleteWagehouse(id).subscribe(responseFromServer => {
      this.wagehouses.data = this.wagehouses.data.filter(eachItem => eachItem.id !== responseFromServer.id);
    });
  }

  editWagehouse(editCustomer: Customer) {
    this.router.navigate(['edit-wagehouse'],  { queryParams: {id: editCustomer.id, name: editCustomer.name,
      address: editCustomer.address, phones: editCustomer.phones } });
  }

  toAddWagehouse() {
    this.router.navigate(['add-wagehouse']);
  }
}
