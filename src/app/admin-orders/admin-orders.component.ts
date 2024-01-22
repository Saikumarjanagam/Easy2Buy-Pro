import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/models/order.model';
import { ShippingService } from 'src/services/shipping.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  adminOrders: Order[] = [];
  _adminOrders = new Order();
  p: number = 1;
  orderPerPage: number = 5;
  // _AdminOrders: boolean = false;

  constructor(private _shippingServices: ShippingService, private toastr: ToastrService, private router: Router) { }
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
  deleteOrder(_orderId: any) {
    this._shippingServices.delete(_orderId)
      .then((response) => {
        this.toastr.success('Product deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
  admin_Orders(id: any) {
    this.router.navigate(['/order-details', id]);
    this._shippingServices._AdminOrders = true;
  }
}
