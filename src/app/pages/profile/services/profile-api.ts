import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../app.config";
import { UserProfile } from "../types/profile-type";

@Injectable({
    providedIn: 'root'
})
export class ProfileApi {
    private readonly baseApiUrl = inject(API_URL)
    private readonly http = inject(HttpClient);

    getUserProfile(userId: number) {
        return this.http.get<UserProfile>(`${this.baseApiUrl}/users/${userId}`);
    }
}