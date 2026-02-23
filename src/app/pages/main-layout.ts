import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../core/components/footer";
import { Header } from "../core/components/header";

@Component({
    selector: 'app-main-layout',
    imports: [RouterOutlet, Header, Footer],
    template: `
    <app-header/>
    <router-outlet/>
    <app-footer/>
    `,
    // styleUrls: ['./main-layout.component.css']
})
export class MainLayout {

}