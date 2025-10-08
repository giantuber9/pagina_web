import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../servicio/carrito.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // Cantidad total de productos en el carrito 
  cantidadProductos: number = 0;

  // Indica si el modo oscuro está activado o no
  modoOscuroActivado = false;

  // Inyectamos el servicio del carrito para poder escuchar los cambios
  constructor(private carritoService: CarritoService) {}

  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit(): void {
    // Nos suscribimos al observable del carrito para actualizar la cantidad de productos cada vez que cambia
    this.carritoService.carrito$.subscribe({
      next: productos => {
        // Calculamos el total sumando la cantidad de cada producto del carrito
        this.cantidadProductos = productos.reduce((total, item) => total + item.cantidad, 0);
      },
      error: () => {
        // Si ocurre un error al leer el carrito, dejamos la cantidad en 0
        this.cantidadProductos = 0;
      }
    });

    // Al iniciar, recuperamos del localStorage si el usuario ya había activado el modo oscuro antes
    if (typeof window !== 'undefined' && window.localStorage) {
      this.modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    }

    // Aplicamos el modo oscuro/claro según el valor recuperado
    this.aplicarModoOscuro();
  }

  // Método que se ejecuta al hacer clic en el botón de modo claro/oscuro
  alternarModoOscuro() {
    // Cambiamos el valor al opuesto
    this.modoOscuroActivado = !this.modoOscuroActivado;

    // Guardamos el nuevo valor en localStorage si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('modoOscuro', String(this.modoOscuroActivado));
    }

    // Aplicamos el modo correspondiente (agregando o quitando la clase)
    this.aplicarModoOscuro();
  }

// Método privado que aplica o quita el modo oscuro según el valor de 'modoOscuroActivado'
private aplicarModoOscuro() {
  // Verificamos que estemos en un entorno donde existe 'document' (es decir, en el navegador)
  if (typeof document !== 'undefined') {
    
    // Si el modo oscuro está activado...
    if (this.modoOscuroActivado) {
      // ...agregamos la clase 'dark-mode' al body del documento
      // Esto hace que se apliquen todos los estilos definidos en CSS para el modo oscuro
      document.body.classList.add('dark-mode');
    } else {
      // Si el modo oscuro NO está activado, quitamos la clase 'dark-mode' del body
      // Así vuelve al modo claro
      document.body.classList.remove('dark-mode');
    }
  }
} 
}
