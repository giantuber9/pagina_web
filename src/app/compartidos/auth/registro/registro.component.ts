import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // 👈 importa Router

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {   // 👈 inyecta Router
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método al enviar el formulario
  onSubmit() {
    this.submitted = true;
    if (this.registroForm.valid) {
      console.log('✅ Formulario válido:', this.registroForm.value);

      // 👉 Aquí iría tu lógica de registro en backend (si corresponde)

      // 🔹 Después de registrar con éxito, redirige a /inicio
      this.router.navigate(['/inicio']);  
    } else {
      console.log('❌ Formulario inválido');
    }
  }

  // Getter para simplificar acceso a los controles en la vista
  get f() {
    return this.registroForm.controls;
  }
}


