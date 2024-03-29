import { ShoppingCartService } from "src/services/shopping-cart.service";
import { BuynowItem } from "./buynow-item.model";
import { Product } from "./product.model";
import { ShippingModel } from "./shipping.model";
import { ShoppingCartItem } from "./shopping-cart-item";

export class Order {
    id?: string;
    userId: string;
    datePlaced: number;
    shippingDetails: ShippingModel = new ShippingModel();
    items: ShoppingCartItem[] = [];
    //buyItems: BuynowItem = new BuynowItem();
    //buyItems: Product = new Product();
    amount: number;
}