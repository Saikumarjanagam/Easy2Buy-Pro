import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _productService: ProductService, private _categoryService: categoryService, private toastr: ToastrService) { }
  products: Product[] = [];
  product = new Product();
  categories: Category[] = [];
  selectedCategory: string = '';
  searchTerm: string;
  p: number = 1;
  productsPerPage: number = 5;
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
  deleteProduct(id: any) {
    this._productService.delete(id)
      .then((response) => {
        this.toastr.success('Product deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }

}
