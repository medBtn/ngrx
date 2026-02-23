import { Component } from "@angular/core";

@Component({
    selector: 'app-login',
    template: `
    <h1>Login</h1>
    <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
    `,
    // styleUrls: ['./login.component.css']
})
export class Login {

}