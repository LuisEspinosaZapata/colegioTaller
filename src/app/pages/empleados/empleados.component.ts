import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']  // <-- corregido a plural
})
export class EmpleadosComponent implements OnInit {
  id: string | null = null;
  cedula: any = '';
  nombre: any = '';
  apellido: any = '';
  email: any = '';
  telefono: any = '';
  genero: any = '';

  usuarios: any[] = [];
  mensaje: string = '';

  servicio = inject(FirebaseService);

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.servicio.getUsuarios().subscribe(data => {
      if (data) {
        this.usuarios = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value
        }));
      } else {
        this.usuarios = [];
      }
    }, error => {
      console.error('Error al cargar usuarios:', error);
    });
  }

  guardar(formulario: any) {
    const usuario = {
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      genero: this.genero
    };

    if (this.id) {
      this.servicio.putUsuario(this.id, usuario).subscribe({
        next: () => {
          alert('✅ Información actualizada correctamente.');
          this.limpiarFormulario(formulario);
          this.cargarUsuarios();
        },
        error: () => alert('❌ Error al actualizar la información.')
      });
    } else {
      this.servicio.postUsuario(usuario).subscribe({
        next: () => {
          alert('✅ Información guardada correctamente.');
          this.limpiarFormulario(formulario);
          this.cargarUsuarios();
        },
        error: () => alert('❌ Error al guardar la información.')
      });
    }
  }

  editarUsuario(usuario: any) {
    this.id = usuario.id;
    this.cedula = usuario.cedula;
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.email = usuario.email;
    this.telefono = usuario.telefono;
    this.genero = usuario.genero;
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.servicio.deleteUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente.');
          this.cargarUsuarios();
        },
        error: () => alert('Error al eliminar usuario.')
      });
    }
  }

  limpiarFormulario(formulario: any) {
    this.id = null;
    formulario.resetForm();
  }
}
