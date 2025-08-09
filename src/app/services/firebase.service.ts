import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private API_FIRE_USUARIOS = "https://productos-372f5-default-rtdb.firebaseio.com/usuarios";
  private API_FIRE_PRODUCTOS = "https://productos-372f5-default-rtdb.firebaseio.com/productos";
  private API_FIRE_FACTURAS = "https://productos-372f5-default-rtdb.firebaseio.com/facturas";

  constructor(private http: HttpClient) { }

  // ------------------- CRUD para USUARIOS -------------------

  postUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_FIRE_USUARIOS}.json`, usuario);
  }


  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_FIRE_USUARIOS}.json`);
  }


  putUsuario(id: string, usuario: any): Observable<any> {
    return this.http.patch(`${this.API_FIRE_USUARIOS}/${id}.json`, usuario);
  }


  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE_USUARIOS}/${id}.json`);
  }


  // ------------------- CRUD para PRODUCTOS -------------------


postProducto(producto: any): Observable<any> {
  return this.http.post(`${this.API_FIRE_PRODUCTOS}.json`, producto);
}


getProductos(): Observable<any> {
  return this.http.get(`${this.API_FIRE_PRODUCTOS}.json`);
}


putProducto(id: string, producto: any): Observable<any> {
  return this.http.patch(`${this.API_FIRE_PRODUCTOS}/${id}.json`, producto);
}


deleteProducto(id: string): Observable<any> {
  return this.http.delete(`${this.API_FIRE_PRODUCTOS}/${id}.json`);
}

  // ------------------- Crear Factura -------------------
postFactura(factura: any): Observable<any> {
  return this.http.post(`${this.API_FIRE_FACTURAS}.json`, factura);
}


getFacturas(): Observable<any> {
  return this.http.get(`${this.API_FIRE_FACTURAS}.json`);
}


}
