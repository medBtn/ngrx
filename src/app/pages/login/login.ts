import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { form, FormField, minLength, required } from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { Button } from "../../shared/components/button";
import { FormErrors } from "../../shared/components/form-errors";

@Component({
    selector: 'app-login',
    imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
    template: ` <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Sign In</h1>

    <form (ngSubmit)="onSubmit($event)" class="space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          autocomplete="username"
          [formField]="loginForm.username"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your username"
        />
        <app-form-errors [control]="loginForm.username()" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          autocomplete="current-password"
          [formField]="loginForm.password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
          placeholder="Enter your password"
        />
        <app-form-errors [control]="loginForm.password()" />
      </div>

      <button size="lg" appButton type="submit" [disabled]="loginForm().invalid()" class="w-full">Sign In</button>

      <p class="text-sm text-center text-slate-500 mt-4">
        Don't have an account?
        <a routerLink="/register" class="text-slate-500 font-medium underline"> Register </a>
      </p>
    </form>
  </div>`,
    host: {
        class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
    },
})
export class Login {

    loginModel = signal({ username: '', password: '' });

    loginForm = form(this.loginModel, (rootPath) => {
        required(rootPath.username, { message: "Username is required" })
        required(rootPath.password, { message: "password is required" })
        minLength(rootPath.password, 6, { message: "Password must be at least 6 characters long" })
    });

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.loginForm().valid()) {
            console.log(this.loginForm().value());
        }
    }
}