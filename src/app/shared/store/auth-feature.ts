import { createFeature, createReducer, on } from "@ngrx/store";
import { authActions } from "./auth-actions";

export type AuthState = {
    token: string | null;
    userId: number | null;
    error: string | null;
    isLoading: boolean;
}

export const initialState: AuthState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,

        // Login actions
        on(authActions.loginSuccess, (state, { token }) => ({
            ...state,
            token,
            isLoading: false
        })),

        on(authActions.loginFailure, (state, { error }) => ({
            ...state,
            error,
            isLoading: false
        })),

        on(authActions.login, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),

        // Register actions
        on(authActions.registerSuccess, (state) => ({
            ...state,
            isLoading: false
        })),

        on(authActions.registerFailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error
        })),

        on(authActions.register, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }))
    )
})