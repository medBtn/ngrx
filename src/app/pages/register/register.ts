import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { form, FormField, minLength, required, validate } from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { Button } from "../../shared/components/button";
import { FormErrors } from "../../shared/components/form-errors";

@Component({
    selector: 'app-register',
    imports: [Button, RouterLink, FormErrors, FormsModule, FormField],
    template: `
  <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Register</h1>

      <form (ngSubmit)="onSubmit($event)" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            autocomplete="username"
            [formField]="registerForm.username"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your username"
          />
          <app-form-errors [control]="registerForm.username()" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 mb-2"> Email </label>
          <input
            id="email"
            type="email"
            autocomplete="username"
            [formField]="registerForm.email"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your username"
          />
          <app-form-errors [control]="registerForm.email()" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            autocomplete="current-password"
            [formField]="registerForm.password"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your password"
          />
          <app-form-errors [control]="registerForm.password()" />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-slate-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autocomplete="current-password"
            [formField]="registerForm.confirmPassword"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your password"
          />
          <app-form-errors [control]="registerForm.confirmPassword()" />
        </div>

        <button (click)="onSubmit($event)"  appButton type="submit" class="w-full">
          Register
        </button>

        <p class="text-sm text-center text-slate-500 mt-4">
          Already have an account?
          <a routerLink="/login" class="text-slate-500 font-medium underline"> Login </a>
        </p>
      </form>
    </div>`,
    host: {
        class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4'
    }
})
export class Register {


    registerModel = signal({ username: '', email: '', password: '', confirmPassword: '' });

    registerForm = form(this.registerModel, (rootPath) => {
        required(rootPath.username, { message: "Username is required" })
        required(rootPath.email, { message: "Email is required" })
        required(rootPath.password, { message: "Password is required" })
        required(rootPath.confirmPassword, { message: "Confirm Password is required" })
        minLength(rootPath.password, 6, { message: "Password must be at least 6 characters long" })
        validate(rootPath.confirmPassword, ({ value, valueOf }) => {
            const password = valueOf(rootPath.password);
            const confirmPassword = value();
            if (!password) return null;
            if (confirmPassword !== password) return {
                kind: 'passwordMismatch',
                message: 'Passwords do not match'
            }
            return null;
        })
    });

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.registerForm().valid()) {
            console.log(this.registerForm().value());
        }
    }
}