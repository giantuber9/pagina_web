import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base del módulo de usuarios en la API
  private apiUrl = 'http://localhost/api_proyecto/public/users';

  constructor(private http: HttpClient) {}

  // Envía las credenciales al backend y retorna la respuesta del servidor
  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  // Envía los datos del nuevo usuario al backend para registrar una cuenta
  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  // Guarda el token y el rol del usuario en el almacenamiento local
  guardarSesion(token: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  }

  // Retorna el rol almacenado, o null si no existe
  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  // Indica si el usuario actual tiene rol de administrador
  esAdmin(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }

  // Elimina los datos de la sesión almacenados
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }
}