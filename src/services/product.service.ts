import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Product } from "src/models/product.model";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private fireStore: AngularFirestore) { }

    create(product: Product) {
        return this.fireStore.collection('product').add({ ...product });
    }
    read(searchTerm: string, _category: string = '') {
        if (searchTerm && _category)
            return this.fireStore.collection('product', ref => ref.where('category', '==', _category).orderBy('name').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();
        else if (_category)
            return this.fireStore.collection('product', ref => ref.where('category', '==', _category)).snapshotChanges();
        else if (searchTerm)
            return this.fireStore.collection('product', ref => ref.orderBy('name').startAt(searchTerm).endAt(`${searchTerm}\uf8ff`)).snapshotChanges();
        else
            return this.fireStore.collection('product').snapshotChanges();
    }

    update(id: string, product: Product) {
        return this.fireStore.doc('product/' + id).update({ ...product });
    }
    delete(id: string) {
        return this.fireStore.doc('product/' + id).delete();
    }
    getById(id: string) {
        return this.fireStore.doc('product/' + id).valueChanges();
    }

}