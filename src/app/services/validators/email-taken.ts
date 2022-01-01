import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, ValidationErrors } from '@angular/forms';
@Injectable({
    providedIn: 'root',
})
export class EmailTaken {
    constructor(private auth: AngularFireAuth) {}

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return this.auth
            .fetchSignInMethodsForEmail(control.value)
            .then((res) => {
                return res.length ? { emailTaken: true } : null;
            });
    };
}
