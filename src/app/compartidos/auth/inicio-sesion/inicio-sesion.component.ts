import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // 🔹 Habilitar botón solo si email + password están completos
  get canLogin(): boolean {
    return !!this.email && !!this.password;
  }

  onSubmit() {
    if (this.canLogin) {
      console.log('✅ Login exitoso:', { email: this.email, password: this.password });
      this.router.navigate(['/inicio']);
    } else {
      console.log('❌ Completa email y contraseña');
    }
  }
}






