import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    constructor(
        private auth: AngularFireAuth,
        public modalService: ModalService,
        public authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    openModal($event: Event) {
        $event.preventDefault();
        this.modalService.toggleModal('auth');
    }
    async logout(e: Event) {
        this.authService.logOutUser(e);
    }
}
