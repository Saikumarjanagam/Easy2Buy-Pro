import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Category } from "src/models/category.model";

@Injectable({
    providedIn: 'root'
})

export class categoryService {

    constructor(private fireStore: AngularFirestore) { }
    create(product: Category) {
        return this.fireStore.collection('category').add({ ...product });
    }
    read() {
        return this.fireStore.collection('category').snapshotChanges();
    }
    update(id: string, product: Category) {
        return this.fireStore.doc('category/' + id).update({ ...product });
    }
    delete(id: string) {
        return this.fireStore.doc('category/' + id).delete();
    }
    getById(id: string) {
        return this.fireStore.doc('category/' + id).valueChanges();
    }
}