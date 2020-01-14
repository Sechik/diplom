import { ProductsClient, Product } from './../../api-service.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, AfterViewInit {
  products = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name', 'cost', 'costRozn', 'customer', 'measure', 'actions'];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private productsClient: ProductsClient, private router: Router) { }

  @ViewChild(MatPaginator, {static: false}) set setPaginator(paginator: MatPaginator) {
    this.products.paginator = paginator;
  }

  @ViewChild(MatSort, {static: false}) set setSort(sort: MatSort) {
     this.products.sort = sort;
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }

  ngOnInit() {
    this.productsClient.getProducts().subscribe(response => {
      this.products.data = response;
    });
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }

  toAddProduct() {
    this.router.navigate(['add-product']);
  }

  editProduct(editProduct: Product) {
    this.router.navigate(['edit-product'],  { queryParams: {id: editProduct.id, name: editProduct.name,
      cost: editProduct.cost, customer: editProduct.customer, customerid: editProduct.customerId, measure: editProduct.measure } });
  }

  deleteProduct(id: string) {
    this.productsClient.deleteProduct(id).subscribe(response => {
      this.products.data = this.products.data.filter(eachItem => eachItem.id !== response.id);
    });
  }
}
