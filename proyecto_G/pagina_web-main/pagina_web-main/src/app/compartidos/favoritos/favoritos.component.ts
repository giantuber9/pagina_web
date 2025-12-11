// favoritos.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../../servicio/favorito.service';
import { CarritoService } from '../../servicio/carrito.service';
import { Producto } from '../../modelos/producto.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
})
export class FavoritosComponent implements OnInit {
  // Se define una propiedad para almacenar los productos marcados como favoritos
productosFavoritos: Producto[] = [];

// Constructor del componente: se inyectan los servicios de favoritos y carrito
constructor(
  private favoritosService: FavoritoService,  // Servicio para manejar productos favoritos
  private carritoService: CarritoService      // Servicio para manejar el carrito de compras
) {}

// Método del ciclo de vida de Angular que se ejecuta al iniciar el componente
ngOnInit(): void {
  // Se suscribe al observable de favoritos del servicio
  // Cada vez que cambien los favoritos, se actualiza la lista local 'productosFavoritos'
  this.favoritosService.favoritos$.subscribe((productos) => {
    this.productosFavoritos = productos;
  });
}

// Método para eliminar un producto de la lista de favoritos
eliminarFavorito(productoId: number) {
  // Llama al servicio para eliminar el producto por su ID
  this.favoritosService.eliminarDeFavoritos(productoId);
}

// Método para agregar un producto al carrito de compras
agregarAlCarrito(producto: Producto) {
  // Llama al servicio de carrito y le pasa el producto seleccionado
  this.carritoService.agregarAlCarrito(producto);
}

}
