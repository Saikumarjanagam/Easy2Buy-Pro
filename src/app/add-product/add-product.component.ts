import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(private _productService: ProductService, private _categoryService: categoryService, private toastr: ToastrService) { }
  product = new Product();
  categories: Category[] = [];
  category = new Category();
  selectCategory = 'Select Category'
  addProduct() {
    this._productService.create(this.product)
      .then((response) => {
        this.toastr.success('Product added successfully...!');
      })
      .catch((error: any) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }

  ngOnInit(): void {
    this.loadCategories();
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
}
