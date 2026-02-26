import { createFeature, createReducer, on } from "@ngrx/store";
import { UserProfile } from "../types/profile-type";
import { profileActions } from "./profile-actions";

export type ProfileState = {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

export const initialState: ProfileState = {
    profile: null,
    isLoading: false,
    error: null
}

export const profileFeature = createFeature({
    name: 'profile',
    reducer: createReducer(
        initialState,
        on(profileActions.load, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(profileActions.loadSuccess, (state, { profile }) => ({
            ...state,
            profile,
            isLoading: false,
        })),
        on(profileActions.loadFailure, (state, { error }) => ({
            ...state,
            error,
            isLoading: false,
        }))
    )
})