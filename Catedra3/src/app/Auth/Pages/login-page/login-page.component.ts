import { Component } from '@angular/core';
import { LoginComponent } from "../../Components/login/login.component";
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent, NavbarComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
