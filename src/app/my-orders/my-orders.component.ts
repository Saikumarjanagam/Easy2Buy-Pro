import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/models/order.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';
import { ShippingService } from 'src/services/shipping.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  p: number = 1;
  myOrders: Order[] = [];
  orders = new Order()
  orderPerPage: number = 5;
  _myOrderDetails = new ShoppingCartItem();
  constructor(public service: ShippingService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    //this.orders.items.lastIndexOf(this._myOrderDetails)
    let userId = localStorage.getItem('loggedInUserId');

    this.service.getUserOrders(userId!)
      .subscribe(response => {
        this.myOrders = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Order
          }
        });

      })
  }
  deleteOrder(_orderId: any) {
    this.service.delete(_orderId)
      .then((response) => {
        this.toastr.success('Product deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
  my_Orders(id: any) {
    this.router.navigate(['/order-details', id]);
    this.service._AdminOrders = false;
  }
}
