import { Component, computed, input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
    selector: 'app-form-errors',
    imports: [],
    template: `
    @if (shouldShowErrors()) {
        @for (error of control().errors(); track error.kind) {
            <small class="block text-sm text-red-600 mt-1">{{ error.message }}</small>
        }
    }
    `
})

export class FormErrors {

    readonly control = input.required<FieldState<unknown>>();

    readonly shouldShowErrors = computed(() => {
        const field = this.control();
        return !field.valid() && field.touched();
    })
}