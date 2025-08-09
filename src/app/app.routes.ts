// src/app/app-routing.module.ts o archivo de rutas

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

import { ProtegerEmpleadosGuard } from './guardianes/proteger-empleados.guard';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './pages/cerrar-sesion/cerrar-sesion.component';
import { ProtegerProductosGuard } from './guardianes/proteger-productos.guard';
import { ProductosComponent } from './pages/productos/productos.component';

import { FacturaComponent } from './pages/factura/factura.component';
import { protegerFacturaGuard } from './guardianes/proteger-factura.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [ProtegerEmpleadosGuard] },
  { path: 'productos', component: ProductosComponent, canMatch: [ProtegerProductosGuard] }, 
  { path: 'factura', component: FacturaComponent, canActivate: [protegerFacturaGuard] },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'cerrarSesion', component: CerrarSesionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


