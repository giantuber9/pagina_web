import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { OfertasComponent } from './paginas/ofertas/ofertas.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { CarritoComponent } from './compartidos/carrito/carrito.component';
import { FavoritosComponent } from './compartidos/favoritos/favoritos.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { InicioSesionComponent } from './compartidos/auth/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './compartidos/auth/registro/registro.component';


export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'favorito', component: FavoritosComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' },
];


