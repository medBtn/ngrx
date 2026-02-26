import { Injectable } from "@angular/core";
import { extractToken } from "../util/extractToken";

@Injectable({
    providedIn: 'root'
})
export class Storage {

    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }

    getUserId(): number | null {
        const token = this.getItem('ngrx_token');
        if (!token) {
            return null;
        }
        const payload = extractToken(token);
        return payload ? payload.sub : null;
    }
}