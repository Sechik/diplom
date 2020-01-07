import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationsClient, Organization } from 'src/app/api-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss']
})
export class ListOrganizationComponent implements OnInit, AfterViewInit {

  organizations = new MatTableDataSource<Organization>();
  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'isJuridical', 'contract', 'bankCode', 'bankAddress',
  'unp', 'paymentAccount', 'actions'];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private organizationsClient: OrganizationsClient, private router: Router) { }

  @ViewChild(MatPaginator, {static: false}) set setPaginator(paginator: MatPaginator) {
    this.organizations.paginator = paginator;
  }

  @ViewChild(MatSort, {static: false}) set setSort(sort: MatSort) {
     this.organizations.sort = sort;
  }

  ngAfterViewInit() {
    this.organizations.paginator = this.paginator;
    this.organizations.sort = this.sort;
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.organizations.filter = filterValue.trim().toLowerCase();
  }

  deleteOrganization(id: string) {
    this.organizationsClient.deleteOrganization(id).subscribe(responseFromServer => {
      this.organizations.data = this.organizations.data.filter(eachItem => eachItem.id !== responseFromServer.id);
    });
  }

  editOrganization(editOrg: Organization) {
    this.router.navigate(['edit-organization'],  { queryParams: {id: editOrg.id, name: editOrg.name,
      address: editOrg.address } });
  }

  toAddOrganization() {
    this.router.navigate(['add-organization']);
  }
}
