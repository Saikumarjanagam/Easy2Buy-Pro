import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shoppingCartItemCount$: Observable<number>;
  constructor(public userService: UserService, private router: Router, private toastr: ToastrService, private _productService: ProductService, private _categoryService: categoryService, private _cartService: ShoppingCartService) {
    this.shoppingCartItemCount$ = _cartService.cartCount$;
  }

  products: Product[] = [];
  product = new Product();
  categories: Category[] = [];
  selectedCategory: string = '';
  searchTerm: string;

  logOut() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('isAdmin');
    this.toastr.success('LogOut Successfully');
    this.router.navigate(['/login']);
    this._cartService.checkOut = false;
  }



  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  loadProducts() {
    this._productService.read(this.searchTerm, this.selectedCategory)
      .subscribe(response => {
        this.products = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Product
          }
        });
        console.log(this.products)
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

  changeCategory($event: any) {
    if ($event.target.selectedIndex > 0)
      this.selectedCategory = this.categories[$event.target.selectedIndex - 1].id!;
    else
      this.selectedCategory = '';
    this.loadProducts();
  }

}
