import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../app/Auth/Pages/login-page/login-page.component').then(m => m.LoginPageComponent),
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent: () => import('../app/Auth/Pages/register-page/register-page.component').then(m => m.RegisterPageComponent),
        pathMatch: 'full'
    },
];
