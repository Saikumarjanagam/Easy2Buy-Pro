import { ShippingModel } from "./shipping.model";
import { ShoppingCartItem } from "./shopping-cart-item";

export class Order {
    id?: string;
    userId: string;
    datePlaced: number;
    shippingDetails: ShippingModel = new ShippingModel();
    items: ShoppingCartItem[] = [];
    amount: number;
}