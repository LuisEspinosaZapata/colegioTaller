import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: null,
    tieneIva: false
  };
  editandoProductoId: string | null = null;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.firebaseService.getProductos().subscribe(data => {
      if (data) {
        this.productos = Object.keys(data).map(id => ({ id, ...data[id] }));
      } else {
        this.productos = [];
      }
    });
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio === null) {
      alert('Ingrese nombre y precio');
      return;
    }
    this.firebaseService.postProducto(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', descripcion: '', precio: null, tieneIva: false };
      this.cargarProductos();
    });
  }

  editarProducto(producto: any) {
    this.editandoProductoId = producto.id;
    this.nuevoProducto = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      tieneIva: producto.tieneIva || false
    };
  }

  actualizarProducto() {
    if (!this.editandoProductoId) return;
    this.firebaseService.putProducto(this.editandoProductoId, this.nuevoProducto).subscribe(() => {
      this.editandoProductoId = null;
      this.nuevoProducto = { nombre: '', descripcion: '', precio: null, tieneIva: false };
      this.cargarProductos();
    });
  }

  cancelarEdicion() {
    this.editandoProductoId = null;
    this.nuevoProducto = { nombre: '', descripcion: '', precio: null, tieneIva: false };
  }

  eliminarProducto(id: string) {
    if (confirm('¿Seguro que desea eliminar este producto?')) {
      this.firebaseService.deleteProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}
