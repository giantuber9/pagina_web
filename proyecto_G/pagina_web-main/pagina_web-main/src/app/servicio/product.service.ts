import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base del módulo de productos en la API
  private apiUrl = 'http://localhost/api_proyecto/public/products';

  constructor(private http: HttpClient) {}

  // Construye las cabeceras HTTP necesarias para las solicitudes protegidas
  // Si existe un token en localStorage, lo incluye como cabecera Authorization
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return headers;
  }

  // Obtiene la lista completa de productos desde la API
  // Es una ruta pública y no requiere token
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtiene un producto específico según su identificador
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Envía un nuevo producto al servidor usando FormData
  // Esto permite incluir archivos de imagen en la solicitud
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  // Actualiza un producto existente
  // Utiliza también FormData para permitir reemplazar la imagen si es necesario
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData, {
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  // Elimina un producto según su id
  // Esta operación está protegida y requiere un token válido
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  // Manejo centralizado de errores para todas las solicitudes
  // Devuelve un mensaje legible en caso de fallo
  private handleError(error: any) {
    console.error('Error en ProductService:', error);

    let msg = 'Ocurrió un error al procesar la solicitud.';
    if (error.error?.message) {
      msg = error.error.message;
    }

    return throwError(() => new Error(msg));
  }
}