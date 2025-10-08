import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { CarritoService } from '../../servicio/carrito.service';
import { FavoritoService } from '../../servicio/favorito.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})
export class ProductosComponent {
  // Variable que almacena el texto que el usuario escribe para filtrar productos
  textoFiltroActual: string = '';

  // Arreglo de objetos con todos los productos disponibles, basados en el modelo
  Productos: Producto[] = [
    {
      id: 1 ,
      nombre: 'Figura de Jotaro Kujo',
      descripcion: 'Figura del personaje jotaro Kujo del anime Jojos bizzare adventure',
      precio: 14.99,
      imagen: '/jotaro-figura.jpg',
      disponibilidad: true
    },
    {
      id: 2 ,
      nombre: 'Deskpad Jojo part 8',
      descripcion: 'Es un pad de escritorio con arte de la parte 8 "jojolion"',
      precio: 24.99,
      imagen: '/deskpad-jojo.jpeg',
      disponibilidad: true
    },
    {
      id: 3 ,
      nombre: 'Alfombra portada phantom blood',
      descripcion: 'Es una alfombra con la imagen de la portada del primer manga de Jojo (en distintos tamaños)',
      precio: 19.99,
      imagen: '/alfombra-jojo-part1.jpeg',
      disponibilidad: true
    },
    {
      id: 4 ,
      nombre: 'Remera part 5 "golden wind" ',
      descripcion: 'Remera con tematica de la parte 5 "golden wind"',
      precio: 7.49,
      imagen: '/remera-jojo.jpg',
      disponibilidad: true
    },
    {
      id: 5 ,
      nombre: 'Perfume de Risotto Nero',
      descripcion: 'Es un perfume con tematica del personaje Risotto Nero de la parte 5',
      precio: 9.49,
      imagen: '/perfume-Risotto-Nero.jpg',
      disponibilidad: true
    },
    {
      id: 6 ,
      nombre: 'Gorra de Jotaro',
      descripcion: 'La gorra de Jotaro de la parte 3 "Stardust Crusaders"',
      precio: 4.99,
      imagen: '/gorra-Jotaro.jpg',
      disponibilidad: true
    },
    {
      id: 7 ,
      nombre: 'Remera de Yoshikage Kira',
      descripcion: 'Es una remera con tematica del villano Yoshikage Kira',
      precio: 7.49,
      imagen: '/remera.jojo-Kira.jpg',
      disponibilidad: true
    },
    {
      id: 8 ,
      nombre: 'Manga completo parte 2',
      descripcion: 'Es la coleccion completa del manga de la parte 2 "battle tendency"',
      precio: 20.00,
      imagen: '/manga-part2-completo.jpg',
      disponibilidad: true
    },
    {
      id: 9 ,
      nombre: 'Perfume de Guido Mista',
      descripcion: 'Perfume con tematica de Guido Mista',
      precio: 9.49,
      imagen: '/perfume-Guido-Mista.png',
      disponibilidad: true
    }
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
