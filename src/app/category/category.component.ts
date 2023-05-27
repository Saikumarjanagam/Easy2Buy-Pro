import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/models/category.model';
import { categoryService } from 'src/services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private _categoryService: categoryService, private toastr: ToastrService) { }
  categories: Category[] = [];
  category = new Category();
  modalHeader: string;
  modalFooter: string;
  aletMessage: string;
  deleteConfirm: boolean = false;
  AddEdit: boolean = false

  categoryForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  get Name() {
    return this.categoryForm.get('name')
  }
  get Description() {
    return this.categoryForm.get('description')
  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this._categoryService.read().subscribe(
      (response) => {
        this.categories = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Category
          }
        })
      }
    )
  }
  addCategory() {
    this.modalHeader = 'Add Category';
    this.modalFooter = 'Add Category'
    this.category = new Category();
    this.categoryForm.reset();
    this.AddEdit = true;
    this.deleteConfirm = false;
  }
  editCategory(_category: Category) {
    this.modalHeader = 'Edit Category';
    this.modalFooter = 'Update Category'
    this.category = _category;
    this.AddEdit = true;
    this.deleteConfirm = false;
  }
  deleteCategiries(name: string) {
    this.modalHeader = 'Delet Category';
    this.modalFooter = 'Confirm to Delete'
    this.aletMessage = 'Confirm to Delete ' + name + ' Category';
    this.deleteConfirm = true;
    this.AddEdit = false;
  }
  deleteCategory(id: any) {
    this._categoryService.delete(id)
      .then((response) => {
        this.toastr.success('Category deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
  saveCategory() {
    if (this.category.id) {
      this._categoryService.update(this.category.id, this.category)
        .then((response) => {
          this.toastr.success('Category updated successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    else {
      this._categoryService.create(this.category)
        .then((response) => {
          this.toastr.success('Category added successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    this.category = new Category();
    this.categoryForm.reset();
  }
}
