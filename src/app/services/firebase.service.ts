import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private API_FIRE = "https://productos-372f5-default-rtdb.firebaseio.com/usuarios";

  constructor(private http: HttpClient) { }

  // Crear nuevo usuario
  postUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_FIRE}.json`, usuario);
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_FIRE}.json`);
  }

  // Actualizar usuario (patch)
  putUsuario(id: string, usuario: any): Observable<any> {
    return this.http.patch(`${this.API_FIRE}/${id}.json`, usuario);
  }

  // Eliminar usuario
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE}/${id}.json`);
  }
}
