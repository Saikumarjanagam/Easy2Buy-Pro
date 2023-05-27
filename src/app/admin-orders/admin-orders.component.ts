import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order.model';
import { ShippingService } from 'src/services/shipping.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  adminOrders: Order[] = [];
  p: number = 1;
  orderPerPage: number = 5;

  constructor(private _shippingServices: ShippingService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this._shippingServices.getAdminOrders()
      .subscribe(response => {
        this.adminOrders = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Order
          }
        });

      })
  }
}
