import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from 'src/app/services/validators/email-taken';
import { RegisterValidators } from 'src/app/services/validators/register-validators';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    inSubmission = false;
    showAlert = false;
    alertMsg = 'Please wait your account is being created';
    alertColor = 'blue';
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    email = new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.emailTaken.validate]
    );
    age = new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(120),
    ]);
    password = new FormControl('', [
        Validators.required,
        Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        ),
    ]);
    confirm_password = new FormControl('', [Validators.required]);
    phoneNumber = new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
    ]);

    constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

    registerForm = new FormGroup(
        {
            name: this.name,
            email: this.email,
            age: this.age,
            password: this.password,
            confirm_password: this.confirm_password,
            phoneNumber: this.phoneNumber,
        },
        [RegisterValidators.match('password', 'confirm_password')]
    );

    async register() {
        this.showAlert = true;
        this.alertColor = 'blue';

        try {
            this.inSubmission = true;
            const userCred = await this.auth.createUser(
                this.registerForm.value
            );

            this.inSubmission = false;
            this.alertMsg = 'Your account has been created successfully';
        } catch (err) {
            console.error(err);
            this.alertColor = 'red';
            this.alertMsg = 'an unexpected error occured, Try again';
            this.inSubmission = false;
            return;
        }
    }
}
