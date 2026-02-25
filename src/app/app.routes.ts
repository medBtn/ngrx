import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as productEffect from './pages/products/store/product-effect';
import { productFeature } from './pages/products/store/product-feature';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((m) => m.Register)
    },

    // Main Layout
    {
        path: '',
        loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
        canActivate: [],
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products').then((m) => m.Products),
                providers: [provideState(productFeature), provideEffects(productEffect)]
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart)
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile)
            }
        ]
    }
];
