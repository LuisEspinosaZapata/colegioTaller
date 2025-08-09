import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- Importar aquí
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';


@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    FormsModule   // <-- Añadir FormsModule aquí
  ],
  exports: [
    IniciarSesionComponent
  ]
})
export class IniciarSesionModule { }
