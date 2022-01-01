import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import IUser from '../models/user.model';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userCollection: AngularFirestoreCollection<Omit<IUser, 'password'>>;
    public isAuthenticated$: Observable<boolean>;
    public isAuthenticatedWithDelay$: Observable<boolean>;

    constructor(
        private auth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router
    ) {
        this.userCollection = this.db.collection('users');
        this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
        this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
            delay(1000)
        );
    }

    public async createUser(userData: IUser) {
        const { email, password, name, phoneNumber, age } = userData;

        const userCred = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );
        if (!userCred.user) {
            throw new Error('User cant be found');
        }
        this.userCollection.doc(userCred.user.uid).set({
            name,
            email,
            age,
            phoneNumber,
        });
        return userCred;
    }

    public async loginUser(email: string, password: string) {
        const userCred = await this.auth.signInWithEmailAndPassword(
            email,
            password
        );
        return userCred;
    }

    public async logOutUser($event?: Event) {
        if ($event) {
            $event.preventDefault();
        }
        await this.auth.signOut();
        await this.router.navigateByUrl('/');
    }
}
