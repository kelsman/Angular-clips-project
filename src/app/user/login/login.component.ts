import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    showAlert = false;
    alertMsg = 'Please wait! Logging in...';
    inSubmission = false;
    alertColor = 'blue';

    credentials = {
        email: '',
        password: '',
    };
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    async login() {
        const { email, password } = this.credentials;
        try {
            this.inSubmission = true;
            this.showAlert = true;

            await this.authService.loginUser(email, password);
            this.inSubmission = false;
            this.alertColor = 'green';
            this.alertMsg = 'Logged in successfully!';
        } catch (e) {
            this.inSubmission = false;
            this.alertColor = 'red';
        }
    }
}
