import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';

import * as authEffect from './shared/store/auth-effect';
import { authFeature } from './shared/store/auth-feature';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(authEffect),
    provideState(authFeature),
    {
      provide: API_URL,
      useValue: 'https://fakestoreapi.com'
    }
  ]
};
