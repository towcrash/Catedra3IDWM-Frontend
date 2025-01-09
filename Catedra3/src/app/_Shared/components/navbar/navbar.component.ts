import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private LSservice = inject(LocalStorageService);
  isLogged: boolean = this.LSservice.getVariable('token') ? true : false;


  constructor(private router: Router) {}

  ngOnInit() {
    
  }


  /**
   * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   */
  logout() {
    this.LSservice.clearAll();
    this.router.navigate(['login']);
  }

  toViewPosts() 
  {
    if (this.isLogged) {
      this.router.navigate(['view_posts']);
    }
    else
    {
      alert('You need to be logged in to access');
      this.router.navigate(['login']);
    }
  }

  
  toPost() 
  {
    if (this.isLogged) {
      this.router.navigate(['post']);
    }
    else
    {
      alert('You need to be logged in to access');
      this.router.navigate(['login']);
    }
  }
}
