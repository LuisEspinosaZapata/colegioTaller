import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private API_USUARIOS = "http://localhost:9090/usuarios";
  private API_PRODUCTOS = "http://localhost:9090/productos";
  private API_FACTURAS  = "http://localhost:9090/factura";
  
  constructor(private http: HttpClient) { }

  // ------------------- CRUD USUARIOS -------------------
  postUsuario(usuario: any): Observable<any> {
    return this.http.post(this.API_USUARIOS, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.API_USUARIOS);
  }

  putUsuario(id: string, usuario: any): Observable<any> { 
    return this.http.put(`${this.API_USUARIOS}/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> { 
    return this.http.delete(`${this.API_USUARIOS}/${id}`);
  }

  // ------------------- CRUD PRODUCTOS -------------------
  postProducto(producto: any): Observable<any> {
    return this.http.post(this.API_PRODUCTOS, producto);
  }

  getProductos(): Observable<any> {
    return this.http.get(this.API_PRODUCTOS);
  }

  putProducto(id: string, producto: any): Observable<any> { 
    return this.http.put(`${this.API_PRODUCTOS}/${id}`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_PRODUCTOS}/${id}`);
  }

  // ------------------- CRUD FACTURAS -------------------
  postFactura(factura: any): Observable<any> {
    return this.http.post(this.API_FACTURAS, factura);
  }

  getFacturas(): Observable<any> {
    return this.http.get(this.API_FACTURAS);
  }

  putFactura(id: string, factura: any): Observable<any> { 
    return this.http.put(`${this.API_FACTURAS}/${id}`, factura);
  }

  deleteFactura(id: string): Observable<any> { 
    return this.http.delete(`${this.API_FACTURAS}/${id}`);
  }
}
