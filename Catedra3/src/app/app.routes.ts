import { Routes } from '@angular/router';
import { AuthGuard } from './Auth/Guards/auth.guard';

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
    {
        path: 'view_posts',
        loadComponent: () => import('../app/Post/Pages/posts-list/posts-list.component').then(m => m.PostsListComponent),
        pathMatch: 'full',
        canActivate:[AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
