import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyOrder } from 'src/models/buy-order.model';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';
import { ShippingService } from 'src/services/shipping.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetail: Order = new Order();
  buyOrderDetails: BuyOrder = new BuyOrder();
  userDetails: User = new User();
  //order = new Order()
  constructor(public _shippingService: ShippingService, private route: ActivatedRoute, private router: Router, private _shoppingService: ShoppingCartService, private _userService: UserService) { }
  ngOnInit(): void {
    this.loadOrders(),
      this.loadBuyOrders(),
      this.loadUserDetails()
  }
  loadOrders() {
    let id = this.route.snapshot.paramMap.get('id')!;
    this._shippingService.getById(id).subscribe(order => {
      this.orderDetail = order as Order;
    });
  }
  loadBuyOrders() {
    let id = this.route.snapshot.paramMap.get('id')!;
    this._shippingService.getById(id).subscribe(order => {
      this.buyOrderDetails = order as BuyOrder;
    });
  }
  loadUserDetails() {
    let userId = this.orderDetail.userId
    this._userService.getById(userId).subscribe(user => {
      this.userDetails = user as unknown as User
    })
  }
  get BuyItemCount() {
    return this._shoppingService.BuyItemsCount
  }
  get BuyItemTotal() {
    return this._shoppingService.BuyItemsTotal
  }
  get admin_Orders() {
    return this._shippingService._AdminOrders
  }
  // get _isAdmin() {
  //   return localStorage.getItem('isAdmin')
  // }

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
