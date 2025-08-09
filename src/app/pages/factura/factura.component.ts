import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  tieneIva: boolean;
}

interface ItemFactura {
  producto: Producto;
  cantidad: number;
  subtotal: number;
  iva: number;
  total: number;
}

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  productos: Producto[] = [];
  itemsFactura: ItemFactura[] = [];

  productoSeleccionadoId: string = '';
  cantidadSeleccionada: number = 1;

  subtotalGeneral: number = 0;
  ivaGeneral: number = 0;
  totalGeneral: number = 0;

  constructor(private firebaseService: FirebaseService) {}

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

  agregarItem() {
    if (!this.productoSeleccionadoId) {
      alert('Seleccione un producto');
      return;
    }
    if (this.cantidadSeleccionada < 1) {
      alert('Ingrese una cantidad válida');
      return;
    }

    const prod = this.productos.find(p => p.id === this.productoSeleccionadoId);
    if (!prod) return;

    const subtotal = prod.precio * this.cantidadSeleccionada;
    const iva = prod.tieneIva ? subtotal * 0.12 : 0;
    const total = subtotal + iva;

    const index = this.itemsFactura.findIndex(item => item.producto.id === prod.id);
    if (index !== -1) {
      this.itemsFactura[index].cantidad += this.cantidadSeleccionada;
      this.itemsFactura[index].subtotal += subtotal;
      this.itemsFactura[index].iva += iva;
      this.itemsFactura[index].total += total;
    } else {
      this.itemsFactura.push({
        producto: prod,
        cantidad: this.cantidadSeleccionada,
        subtotal,
        iva,
        total
      });
    }

    this.calcularTotales();

    this.productoSeleccionadoId = '';
    this.cantidadSeleccionada = 1;
  }

  eliminarItem(index: number) {
    this.itemsFactura.splice(index, 1);
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotalGeneral = this.itemsFactura.reduce((sum, item) => sum + item.subtotal, 0);
    this.ivaGeneral = this.itemsFactura.reduce((sum, item) => sum + item.iva, 0);
    this.totalGeneral = this.subtotalGeneral + this.ivaGeneral;
  }

  guardarFactura() {
    if (this.itemsFactura.length === 0) {
      alert('Agrega al menos un producto a la factura');
      return;
    }

    const factura = {
      fecha: new Date().toISOString(),
      items: this.itemsFactura,
      subtotal: this.subtotalGeneral,
      iva: this.ivaGeneral,
      total: this.totalGeneral
    };

    this.firebaseService.postFactura(factura).subscribe(() => {
      alert('Factura guardada correctamente');
      this.itemsFactura = [];
      this.subtotalGeneral = 0;
      this.ivaGeneral = 0;
      this.totalGeneral = 0;
    });
  }

}
