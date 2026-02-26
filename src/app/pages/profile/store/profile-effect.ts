import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProfileApi } from "../services/profile-api";
import { profileActions } from "./profile-actions";

export const profileEffect = createEffect(
    (action$ = inject(Actions), profileApi = inject(ProfileApi)) => {
        return action$.pipe(
            ofType(profileActions.load),
            switchMap(({ userId }) => {
                return profileApi.getUserProfile(userId).pipe(
                    map(profile => profileActions.loadSuccess({ profile })),
                    catchError(error => of(profileActions.loadFailure({ error })))
                )
            })
        )
    },
    {
        functional: true
    })