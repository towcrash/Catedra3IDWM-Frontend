import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { ResponseAPIUser } from '../Interfaces/ResponseApiUser';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5042/api/Auth/';
    public errors: string [] = [];
    private http = inject(HttpClient);
    private router = inject(Router);
    public localStorageService = inject(LocalStorageService);
  
    /**
     * Inicia sesión con el formulario proporcionado.
     * @param form El formulario de inicio de sesión.
     * @returns Una promesa con la respuesta del usuario.
     */
    async login(form: any): Promise<ResponseAPIUser> {
      try {
        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'login', form));
        this.localStorageService.setVariable('token', response.token);
        this.router.navigate(['/home']); 
        return Promise.resolve(response);
      } catch (error) {
        console.log('Error en el servicio de login', error);

        let e = error as HttpErrorResponse;
        this.errors.push(e.message || 'Error Desconocido');

        return Promise.reject(this.errors);
      }
    }

    /**
     * Registra un nuevo usuario con el formulario proporcionado.
     * @param form El formulario de registro.
     * @returns Una promesa con la respuesta del usuario.
     */
    async register(form: any): Promise<ResponseAPIUser> {
      try {
        form.enabled = true;
        const [day, month, year] = form.birthdate.split('-').map((val: string) => parseInt(val, 10));
        form.birthdate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`; // Asegúrate de que la fecha de nacimiento esté en formato dd-mm-yyyy

        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'register', form));
        this.localStorageService.setVariable('token', response.token);// Guarda el rol
        return Promise.resolve(response);
      } catch (error) {
        console.log('Error en el servicio de registro', error);

        let e = error as HttpErrorResponse;
        this.errors.push(e.message || 'Error Desconocido');

        return Promise.reject(this.errors);
      }
    }

    /**
     * Cierra la sesión del usuario.
     */
    logout() {
        this.localStorageService.clearAll(); 
        this.router.navigate(['/']);
    }
}
