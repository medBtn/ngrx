import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../app.config";


export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type RegisterRequest = {
    id: number;
    username: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthApi {
    private readonly baseApiUrl = inject(API_URL);
    private readonly http = inject(HttpClient);

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseApiUrl}/auth/login`, request);
    }

    register(request: RegisterRequest): Observable<RegisterRequest> {
        return this.http.post<RegisterRequest>(`${this.baseApiUrl}/users`, request);
    }

}