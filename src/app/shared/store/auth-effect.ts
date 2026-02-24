import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NgToastService } from "ng-angular-popup";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthApi } from "../services/auth-api";
import { Storage } from "../services/storage";
import { extractToken } from "../util/extractToken";
import { authActions } from "./auth-actions";

export const loginEffect = createEffect(
    (
        actions$ = inject(Actions),
        authApi = inject(AuthApi),
        router = inject(Router),
        storage = inject(Storage),
        toast = inject(NgToastService)
    ) => {
        return actions$.pipe(
            ofType(authActions.login),
            switchMap((loginRequest) => {
                return authApi.login(loginRequest).pipe(
                    map((response) => {
                        router.navigateByUrl('/products');
                        storage.setItem('ngrx_token', response.token);
                        const payload = extractToken(response.token);
                        if (payload) {
                            toast.success('Login Success', 'SUCCESS');
                            return authActions.loginSuccess({ token: response.token, userId: payload.sub });
                        }
                        return authActions.loginSuccess({ token: response.token, userId: null })
                    }),
                    catchError((error) => {
                        toast.danger('Login Failed', 'ERROR');
                        return of(authActions.loginFailure({ error: error.message }))
                    })
                )
            })

        )
    },
    {
        functional: true
    })


export const registerEffect = createEffect(
    (
        actions$ = inject(Actions),
        authApi = inject(AuthApi),
        router = inject(Router),
        toast = inject(NgToastService)
    ) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap((registerRequest) => {
                return authApi.register(registerRequest).pipe(
                    map((response) => {
                        router.navigateByUrl('/login');
                        toast.success('Register Success', 'SUCCESS');
                        return authActions.registerSuccess();
                    }),
                    catchError((error) => {
                        toast.danger('Register Failed', 'ERROR');
                        return of(authActions.registerFailure({ error: error.message }))
                    })
                )
            })
        )
    },
    {
        functional: true
    }
)