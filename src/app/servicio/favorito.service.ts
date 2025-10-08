import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  // Se declara un Subject de tipo BehaviorSubject que almacena un array de productos.
// Inicialmente está vacío ([]). Es privado para que no se acceda directamente desde otros componentes.
private favoritosSubject = new BehaviorSubject<Producto[]>([]);

// Se expone el observable para que otros componentes puedan suscribirse y reaccionar a los cambios.
favoritos$ = this.favoritosSubject.asObservable();

// Método para agregar un producto a la lista de favoritos
agregarAFavoritos(producto: Producto) {
  // Se obtiene la lista actual de favoritos
  const favoritos = this.favoritosSubject.getValue();

  // Se verifica si el producto ya existe en la lista (por ID)
  const existe = favoritos.find(p => p.id === producto.id);

  // Si el producto no está en la lista, se agrega y se actualiza el estado del BehaviorSubject
  if (!existe) {
    this.favoritosSubject.next([...favoritos, producto]);
  }
}

// Método para eliminar un producto de la lista de favoritos según su ID
eliminarDeFavoritos(productoId: number) {
  // Se filtran los productos dejando afuera el que tiene el ID que se quiere eliminar
  const actualizados = this.favoritosSubject.getValue().filter(p => p.id !== productoId);

  // Se actualiza el BehaviorSubject con la nueva lista de favoritos
  this.favoritosSubject.next(actualizados);
}

// Método para vaciar completamente la lista de favoritos
vaciarFavoritos() {
  // Se actualiza el BehaviorSubject con un array vacío
  this.favoritosSubject.next([]);
}
}