import { NgModule } from '@angular/core';
import {
    AngularFireAuthGuard,
    redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
    {
        path: 'manage',
        component: ManageComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: () => redirectUnauthorizedTo('/') },
    },
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: () => redirectUnauthorizedTo('/') },
    },
    { path: 'manage-clips', redirectTo: 'manage' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoRoutingModule {}
