import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { CarritoService } from '../../servicio/carrito.service';
import { FavoritoService } from '../../servicio/favorito.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']

})
export class OfertasComponent {
  // Variable que almacena el texto que el usuario escribe para filtrar productos
  textoFiltroActual: string = '';

  // Arreglo de objetos con todos los productos disponibles, basados en el modelo
  Productos: Producto[] = [
    {
      id: 1 ,
      nombre: 'Peluche de Jotaro parte 3',
      descripcion: 'Peluche del protagonista de la parte 3 Jotaro Kujo',
      precio: 4.99,
      imagen: '/peluche_jotaro.jpg',
      disponibilidad: true
    },
    {
      id: 2 ,
      nombre: 'Collar piedra aja',
      descripcion: 'Es el collar de Lisa Lisa con la piedra aja"',
      precio: 7.50,
      imagen: '/piedra_aja.jpg',
      disponibilidad: true
    },
    {
      id: 3 ,
      nombre: 'Peluche de Weather Report',
      descripcion: 'Es un peluche del personaje secundario de la parte 6 Weather Report',
      precio: 4.99,
      imagen: '/peluche_weather_report.jpg',
      disponibilidad: true
    },
    {
      id: 4 ,
      nombre: 'Nendoroid Kira Yoshikage"',
      descripcion: 'Figura "Nendoroid" del villano Kira Yoshikage',
      precio: 9.50,
      imagen: '/nendoroid_kira.jpg',
      disponibilidad: true
    },
    {
      id: 5 ,
      nombre: 'Figura de Joseph Joestar',
      descripcion: 'Figura del protagonista de la parte 2 (battle tendency) Joseph Joestar',
      precio: 9.50,
      imagen: '/figura_joseph.jpg',
      disponibilidad: true
    },
    {
      id: 6 ,
      nombre: 'Nendoroid Giorno Giovanna',
      descripcion: 'Figura "Nendoroid" del protagonista Giorno Giovanna',
      precio: 9.50,
      imagen: '/nenodoir_giorno.png',
      disponibilidad: true
    },
  ];

  // Arreglo que contiene los productos que se muestran tras aplicar el filtro// inicialmente contiene todos
  ProductosFiltrados: Producto[] = [...this.Productos];

  // Constructor con inyección de servicios para carrito y favoritos
  constructor(
    private carritoService: CarritoService, // Servicio para gestionar el carrito de compras
    private favoritoService: FavoritoService // Servicio para gestionar favoritos
  ) { }

  // Método para filtrar productos según el texto que el usuario escribe en el filtro
  buscar() {
    // Pasa el texto del filtro a minúsculas y elimina espacios al principio y al final
    const filtro = this.textoFiltroActual.toLowerCase().trim();

    if (!filtro) {
      // Si el filtro está vacío, muestra todos los productos
      this.ProductosFiltrados = [...this.Productos];
    } else {
      // Si hay texto, filtra los productos cuyo nombre o descripción contienen ese texto
      this.ProductosFiltrados = this.Productos.filter(p =>
        p.nombre.toLowerCase().includes(filtro) ||
        p.descripcion.toLowerCase().includes(filtro)
      );
    }
  }

  // Método para agregar un producto al carrito de compras
  agregar(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto);  // Llama al servicio para agregar el producto
    alert('Producto agregado al carrito');  // Muestra alerta confirmando la acción
  }

  // Método para agregar un producto a la lista de favoritos
  agregarAFavoritos(producto: Producto) {
    this.favoritoService.agregarAFavoritos(producto);  // Llama al servicio para agregar a favoritos
    alert('Producto agregado a favoritos');  // Muestra alerta confirmando la acción
  }

  // Método para limpiar el filtro y mostrar nuevamente todos los productos
  limpiarFiltro() {
    this.textoFiltroActual = '';  // Limpia el texto del filtro
    this.buscar();  // Actualiza la lista para mostrar todos los productos
  }

}
