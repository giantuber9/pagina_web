import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicio/carrito.service';
import { Producto } from '../../modelos/producto.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  // Arreglo que guarda los productos en el carrito, con su cantidad
  productosEnCarrito: { producto: Producto; cantidad: number }[] = [];

  // Inyectamos el servicio del carrito en el constructor
  constructor(private carritoService: CarritoService, private router: Router) { }

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Nos suscribimos al observable del carrito para mantener actualizada la lista de productos
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
    });
  }

  // Método para aumentar la cantidad de un producto en el carrito
  agregarCantidad(index: number) {
    // Se obtiene el item (producto con cantidad) del carrito según el índice recibido
    const item = this.productosEnCarrito[index];

    // Llama al servicio del carrito para actualizar la cantidad del producto,
    // sumando 1 a la cantidad actual
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad + 1);
  }

  // Método para disminuir la cantidad de un producto en el carrito
  quitarCantidad(index: number) {
    // Se obtiene el item (producto con cantidad) del carrito según el índice recibido
    const item = this.productosEnCarrito[index];

    // Se verifica que la cantidad actual sea mayor a 1 para evitar cantidades menores o iguales a 0
    if (item.cantidad > 1) {
      // Se llama al servicio del carrito para actualizar la cantidad del producto,
      // restando 1 a la cantidad actual
      this.carritoService.actualizarCantidad(item.producto.id, item.cantidad - 1);
    }
  }

  // Método para eliminar completamente un producto del carrito
  eliminarProducto(productoId: number) {
    this.carritoService.eliminarDelCarrito(productoId);
  }

  // Método para vaciar todo el carrito
  vaciarCarrito() {                            
    this.carritoService.vaciarCarrito();
  }
  
  // Navega al formulario de compra
irAFormularioCompra() {
  // Redirige al usuario a la ruta '/compra', donde se encuentra el formulario para finalizar la compra
  this.router.navigate(['/compra']);
}

// Calcula el total del carrito de compras
calcularTotal(): number {
  // Recorre el arreglo de productos en el carrito y suma el resultado de (precio * cantidad) de cada ítem
  return this.productosEnCarrito.reduce((total, item) => {
    return total + item.producto.precio * item.cantidad;
  }, 0); // El acumulador 'total' comienza en 0
}
}