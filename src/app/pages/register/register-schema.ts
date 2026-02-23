import { minLength, required, schema, validate } from "@angular/forms/signals";

export type RegisterModel = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterSchema = schema<RegisterModel>((rootPath) => {
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

