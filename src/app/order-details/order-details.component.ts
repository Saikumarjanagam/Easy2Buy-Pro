import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/models/order.model';
import { ShippingService } from 'src/services/shipping.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetail: Order = new Order();
  constructor(private _shippingService: ShippingService, private route: ActivatedRoute, private router: Router, private _shoppingService: ShoppingCartService) { }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this._shippingService.getById(id).subscribe(order => {
      this.orderDetail = order as Order;
    });
  }
  get BuyItemCount() {
    return this._shoppingService.BuyItemsCount
  }
  get BuyItemTotal() {
    return this._shoppingService.BuyItemsTotal
  }


  // buyCout() {
  //   this._shoppingService.BuyItemsCount
  // }
  redirectToOrdersPage() {
    let viewFrom = this.route.snapshot.queryParamMap.get('viewFrom');
    if (viewFrom === 'admin') {
      this.router.navigate(['/admin/orders']);
    }
    else {
      this.router.navigate(['/my-orders']);
    }
  }
}
