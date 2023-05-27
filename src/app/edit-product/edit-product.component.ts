import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(private _productService: ProductService, private toastr: ToastrService, private router: ActivatedRoute, private _categoryService: categoryService) { }
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


}
