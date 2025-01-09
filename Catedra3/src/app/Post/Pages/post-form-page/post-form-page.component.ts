import { Component } from '@angular/core';
import { PostFormComponent } from "../../Components/post-form/post-form.component";
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'app-post-form-page',
  imports: [PostFormComponent, NavbarComponent],
  templateUrl: './post-form-page.component.html',
  styleUrl: './post-form-page.component.css'
})
export class PostFormPageComponent {

}
