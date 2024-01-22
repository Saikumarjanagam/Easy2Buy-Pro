import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BuyOrder } from "src/models/buy-order.model";
import { Order } from "src/models/order.model";

@Injectable({
    providedIn: 'root'
})
export class ShippingService {
    constructor(private fireStore: AngularFirestore) { }
    public _AdminOrders: boolean = false;

    create(_order: Order) {
        return this.fireStore.collection('orders').add({ ..._order });
    }
    buyOrderCreate(_buyOrder: BuyOrder) {
        return this.fireStore.collection('orders').add({ ..._buyOrder });
    }
    delete(_orderId: string) {
        return this.fireStore.doc('orders/' + _orderId).delete();
    }
    getUserOrders(userId: string) {
        return this.fireStore.collection('orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
    }
    getAdminOrders() {
        return this.fireStore.collection('orders').snapshotChanges();
    }
    getById(id: string) {
        return this.fireStore.doc('orders/' + id).valueChanges();
    }
}