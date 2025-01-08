import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  registrationAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  private authService = inject(AuthService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  /**
   * Crea el formulario de registro con validaciones.
   */
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  /**
   * Registra un nuevo usuario.
   */
  async register() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      this.registrationAlert = true;
      return;
    }

    const formValue = { ...this.form.value };

    try {
      const response = await this.authService.register(formValue);
      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.router.navigate(['login']);
      } else {
        this.errorMessage = 'Registro fallido.';
        this.registrationAlert = true;
      }
    } catch (error: any) {
      this.errorMessage = 'Error en el registro.';
      this.registrationAlert = true;
    }
  }

  /**
   * Cierra la alerta de error.
   */
  closeAlert() {
    this.errorMessage = '';
    this.registrationAlert = false;
  }
}
