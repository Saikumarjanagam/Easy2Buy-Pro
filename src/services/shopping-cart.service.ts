import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ShoppingCartItem } from "src/models/shopping-cart-item";
import { UserService } from "./user.service";
import { BuynowItem } from "src/models/buynow-item.model";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {
    public checkOut: boolean = false;
    public buyNowCheck: boolean = false;
    private cartItems: ShoppingCartItem[] = [];
    private buynow: BuynowItem[] = [];
    private _cartItemsQuantity: number = 0;
    private _cartItemsTotal: number = 0;

    private cartCount = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCount.asObservable();

    private buyCount = new BehaviorSubject<number>(0);
    buyCount$ = this.buyCount.asObservable();

    constructor(private _userService: UserService) {
        this.loadCartItems();
    }
    get CartItems() { this.loadCartItems(); return this.cartItems; }
    get CartItemsCount() { return this._cartItemsQuantity; }
    get CartItemsTotal() { return this._cartItemsTotal }

    addItemToCart(_cartItem: ShoppingCartItem) {
        this.loadCartItems();

        const _itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id);

        if (_itemIndex >= 0) {

            this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
        }

        if (_itemIndex > -1) {
            this.cartItems[_itemIndex].quantity += 1;
            this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
        }
        else
            this.cartItems.push(_cartItem);
        this.saveCartItem();
    }
    buyNow(_buyItem: ShoppingCartItem) {
        this.loadBuyItems();

        const _itemIndex = this.cartItems.findIndex(x => x.id === _buyItem.id);

        if (_itemIndex >= 0) {

            this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
        }
        else if (_itemIndex > -1) {
            this.cartItems[_itemIndex].quantity += 1;
            this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
        }
        else
            this.buynow.push(_buyItem);
        this.buyitem();
        // this.saveCartItem();
    }

    removeItemFromCart(_cartItem: ShoppingCartItem) {
        this.loadCartItems();
        const _itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id && x.quantity > 1);
        if (_itemIndex > -1) {
            this.cartItems[_itemIndex].quantity += -1;
            this.cartItems[_itemIndex].totalPrice = this.cartItems[_itemIndex].quantity * this.cartItems[_itemIndex].price;
        }
        else {
            let _index = this.cartItems.findIndex(x => x.id === _cartItem.id);
            this.cartItems.splice(_index, 1);
        }
        this.saveCartItem();
    }
    clearCartItems() {
        let cartItemsStorageKey = this._userService.loggedInUserId + 'cart_items';
        let cartItemsCountKey = this._userService.loggedInUserId + 'cart_count';
        localStorage.removeItem(cartItemsStorageKey);
        localStorage.removeItem(cartItemsCountKey);
        this.loadCartItems();
    }
    loadCartItems() {
        let cartItemsStorageKey = this._userService.loggedInUserId + 'cart_items';
        this.cartItems = JSON.parse(localStorage.getItem(cartItemsStorageKey) || '[]');

        let _totalQty = 0;
        this.cartItems.forEach(_item => { _totalQty += _item.quantity });

        this.cartCount.next(_totalQty);

        let _totalPrice = 0;
        this.cartItems.forEach(_item => { _totalPrice += _item.totalPrice });

        this._cartItemsQuantity = _totalQty;
        this._cartItemsTotal = _totalPrice;
    }
    loadBuyItems() {
        let buyItemsStorageKey = this._userService.loggedInUserId + 'buy_items';
        this.cartItems = JSON.parse(localStorage.getItem(buyItemsStorageKey) || '[]');

        let _totalQty = 0;
        this.cartItems.forEach(_item => { _totalQty += _item.quantity });

        this.buyCount.next(_totalQty);

        let _totalPrice = 0;
        this.cartItems.forEach(_item => { _totalPrice += _item.totalPrice });

        this._cartItemsQuantity = _totalQty;
        this._cartItemsTotal = _totalPrice;
    }
    saveCartItem() {
        let cartItemsStorageKey = this._userService.loggedInUserId + 'cart_items';
        let cartItemsCountKey = this._userService.loggedInUserId + 'cart_count';

        localStorage.setItem(cartItemsStorageKey, JSON.stringify(this.cartItems));
        localStorage.setItem(cartItemsCountKey, this._cartItemsQuantity.toString());

        this.cartCount.next(this._cartItemsQuantity);
    }
    buyitem() {
        let buyItemsStorageKey = this._userService.loggedInUserId + 'buy_items';
        let buyItemsCountKey = this._userService.loggedInUserId + 'buy_count';

        localStorage.setItem(buyItemsStorageKey, JSON.stringify(this.cartItems));
        localStorage.setItem(buyItemsCountKey, this._cartItemsQuantity.toString());

        this.buyCount.next(this._cartItemsQuantity);
    }

}