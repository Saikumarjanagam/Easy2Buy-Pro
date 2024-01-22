import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public loginSuccess: boolean = false;
    constructor(private fireStore: AngularFirestore) { }

    validate(email: string, password: string) {
        return this.fireStore.collection('users', ref => ref.where('email', '==', email).where('password', '==', password)).snapshotChanges();

    }
    register(userModel: User) {
        return this.fireStore.collection('users').add({ ...userModel });
    }
    read() {
        return this.fireStore.collection('users').snapshotChanges();
    }
    update(id: string, users: User) {
        return this.fireStore.doc('users' + '/' + id).update({ ...users });
    }
    delete(id: string) {
        return this.fireStore.doc('users' + '/' + id).delete()
    }
    getById(id: string) {
        return this.fireStore.doc('users/' + id).valueChanges()
    }

    get firstName() {
        return localStorage.getItem('firstName');
    }
    get loggedInUserId() {
        return localStorage.getItem('loggedInUserId');
    }
    get isAdmin(): boolean {
        return localStorage.getItem('isAdmin') === 'true';
    }
}
