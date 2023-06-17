import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  constructor(private _productService: ProductService, private toastr: ToastrService, private router: ActivatedRoute, private _categoryService: categoryService, private _cartService: ShoppingCartService) { }
  product = new Product();
  // items: ItemModel[] = [];
  productId: string;
  categories: Category[] = [];
  category = new Category();

  ngOnInit(): void {
    this.loadProducts(),
      this.loadCategories()
  }
  loadProducts() {
    let id = this.router.snapshot.paramMap.get('id');
    this.productId = id ? id : '';

    this._productService.getById(this.productId).subscribe((response) => {
      this.product = response as unknown as Product
    })
  }
  loadCategories() {
    this._categoryService.read()
      .subscribe(response => {
        this.categories = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Category
          }
        });
      })
  }

  saveProduct() {
    if (this.productId) {
      this._productService.update(this.productId, this.product).then((response) => {
        this.toastr.success('Updated successfully')
      })
    }
  }
  addToCart(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    this._cartService.addItemToCart(_cartItem);
  }
  buyNow(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    // this._cartService.buyNow(_cartItem);
  }
  removeFromCart(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = -1;
    this._cartService.removeItemFromCart(_cartItem);
  }
  getQuantity(_product: Product) {
    let _itemQty: number = 0;
    this._cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { _itemQty += _item.quantity })
    return _itemQty;
  }

}

