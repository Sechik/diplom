import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Deal, DealsClient } from 'src/app/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-deal',
  templateUrl: './list-deal.component.html',
  styleUrls: ['./list-deal.component.scss']
})
export class ListDealComponent implements OnInit, AfterViewInit {

  deals = new MatTableDataSource<Deal>();
  displayedColumns: string[] = ['id', 'organization', 'product', 'date', 'count', 'sum'];
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private dealsClient: DealsClient, private router: Router) { }

  @ViewChild(MatPaginator, {static: false}) set setPaginator(paginator: MatPaginator) {
    this.deals.paginator = paginator;
  }

  @ViewChild(MatSort, {static: false}) set setSort(sort: MatSort) {
     this.deals.sort = sort;
  }

  ngAfterViewInit() {
    this.deals.paginator = this.paginator;
    this.deals.sort = this.sort;
  }

  ngOnInit() {
    this.dealsClient.getDeals().subscribe(response => {
    this.deals.data = response;
    });
  }

  applyFilter(filterValue: string) {
    this.deals.filter = filterValue.trim().toLowerCase();
  }

  deleteDeal(id: string) {
    this.dealsClient.deleteDeal(id).subscribe(responseFromServer => {
      this.deals.data = this.deals.data.filter(eachItem => eachItem.id !== responseFromServer.id);
    });
  }

  editDeal(editCustomer: Deal) {
    this.router.navigate(['edit-deal'],  { queryParams: {id: editCustomer.id} });
  }

  toAddDeal() {
    this.router.navigate(['add-deal']);
  }

}
