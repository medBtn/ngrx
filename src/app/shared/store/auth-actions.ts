import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginRequest, RegisterRequest } from "../services/auth-api";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<LoginRequest>(),
        loginSuccess: props<{ token: string }>(),
        loginFailure: props<{ error: string }>(),


        register: props<RegisterRequest>(),
        registerSuccess: emptyProps(),
        registerFailure: props<{ error: string }>(),
    }
})