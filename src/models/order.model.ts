import { BuynowItem } from "./buynow-item.model";
import { ShippingModel } from "./shipping.model";
import { ShoppingCartItem } from "./shopping-cart-item";

export class Order {
    id?: string;
    userId: string;
    datePlaced: number;
    shippingDetails: ShippingModel = new ShippingModel();
    items: ShoppingCartItem[] = [];
    buyItems: BuynowItem[] = [];
    amount: number;
}