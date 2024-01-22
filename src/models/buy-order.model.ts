import { Product } from "./product.model";
import { ShippingModel } from "./shipping.model";

export class BuyOrder {
    id?: string;
    userId: string;
    datePlaced: number;
    shippingDetails: ShippingModel = new ShippingModel();
    //items: ShoppingCartItem[] = [];
    //buyItems: BuynowItem = new BuynowItem();
    buyItems: Product = new Product();
    amount: number;
}