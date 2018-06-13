import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  hidden = false;

  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    const routerSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.product = this.productService.getProductById(params['id']);
      });
    this.subscriptions.push(routerSubscription);
  }

  getPriceWithDiscount(price: number) {
    const discountPrice: number = price - (price * (this.product.discount / 100));
    const decimalPoints: any = 2;
    return (discountPrice).toFixed(decimalPoints);
  }

  changeText(event) {
    const detailed: HTMLElement = event.target;
    const icon = '<i class="fa fa-info-circle"></i>&nbsp;&nbsp;';
    if (this.hidden) {
      this.hidden = false;
      detailed.innerHTML = icon + ' Показати деталі';
    } else {
      this.hidden = true;
      detailed.innerHTML = icon + ' Приховати деталі';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
