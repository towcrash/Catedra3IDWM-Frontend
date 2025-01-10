import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../_Shared/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  providers: [AuthService, LocalStorageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  

  private AuthService = inject(AuthService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  /**
   * Inicializa el formulario con validaciones.
   */
  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Valida si el campo de email es inválido y ha sido tocado.
   */
  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  /**
   * Valida si el campo de contraseña es inválido y ha sido tocado.
   */
  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  /**
   * Maneja el proceso de inicio de sesión.
   */
  async login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      this.loginAlert = true;
      return;
    }

    try {
      const response = await this.AuthService.login(this.form.value);

      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.localStorage.setVariable('id', response.id);
        this.router.navigate(['view_posts'])
      } else {
        this.errorMessage = 'Contraseña inválida.';
        this.loginAlert = true;
      }

    } catch (error: any) {
      this.errorMessage = 'Correo electrónico o contraseña inválidos.';
      this.loginAlert = true;
    }
  }

  /**
   * Método para cerrar la alerta.
   */
  closeAlert() {
    this.errorMessage = '';
    this.loginAlert = false;
  }
}
