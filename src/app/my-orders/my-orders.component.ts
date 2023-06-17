import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/models/order.model';
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

  constructor(public service: ShippingService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
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
}
