import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productService.products;
  }
}
