import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.model'; 

@Injectable({
  providedIn: 'root'
})
// Servicio que gestiona el carrito de compras
export class CarritoService {
  // Creamos un BehaviorSubject que mantiene el estado del carrito como un arreglo de productos con cantidad
  private carritoSubject = new BehaviorSubject<{ producto: Producto; cantidad: number }[]>([]);
  
  // Observable que permite suscribirse a los cambios del carrito
  carrito$ = this.carritoSubject.asObservable();

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: Producto) {
    // Obtenemos el valor actual del carrito
    const productos = this.carritoSubject.getValue();
    
    // Buscamos si el producto ya existe en el carrito
    const encontrado = productos.find(p => p.producto.id === producto.id);

    if (encontrado) {
      // Si el producto ya existe, aumentamos su cantidad
      encontrado.cantidad++;
      // Emitimos una nueva copia del carrito para actualizar el estado
      this.carritoSubject.next([...productos]);
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      this.carritoSubject.next([...productos, { producto, cantidad: 1 }]);
    }
  }

  // Método para eliminar un producto del carrito por su ID
  eliminarDelCarrito(productoId: number) {
    // Filtramos el producto que queremos eliminar
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId);
    // Actualizamos el carrito sin ese producto
    this.carritoSubject.next(productos);
  }

  // Método para vaciar completamente el carrito
  vaciarCarrito() {
    // Emitimos un arreglo vacío
    this.carritoSubject.next([]);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  actualizarCantidad(productoId: number, nuevaCantidad: number) {
    // Recorremos el carrito y actualizamos la cantidad del producto con el ID dado
    const productos = this.carritoSubject.getValue().map(item => {
      if (item.producto.id === productoId) {
        // Retornamos una copia del producto con la nueva cantidad
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    });

    // Emitimos el nuevo estado del carrito
    this.carritoSubject.next(productos);
  }

  // Método para obtener los productos del carrito como un arreglo
  obtenerProductos(): { producto: Producto; cantidad: number }[] {
    return this.carritoSubject.getValue();
  }

  // Método para calcular el total a pagar (precio * cantidad de cada producto)
  obtenerTotal(): number {
    const productos = this.carritoSubject.getValue();
    // Usamos reduce para sumar los subtotales de cada producto
    return productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }
}
