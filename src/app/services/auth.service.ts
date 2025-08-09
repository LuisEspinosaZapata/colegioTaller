import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private router: Router, private firebaseService: FirebaseService) {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  login(email: string, contrasena: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.firebaseService.getUsuarios().subscribe(data => {
        if (!data) {
          observer.next(false);
          observer.complete();
          return;
        }
        const usuarios = Object.values(data) as any[];
        const user = usuarios.find(u => u.email === email && u.contrasena === contrasena);
        if (user) {
          this.usuarioSubject.next(user);
          localStorage.setItem('usuario', JSON.stringify(user));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, err => {
        observer.next(false);
        observer.complete();
      });
    });
  }

  logout() {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
    this.router.navigate(['/iniciarSesion']);
  }

  get usuarioActual() {
    return this.usuarioSubject.value;
  }

  estaLogueado(): boolean {
    return !!this.usuarioSubject.value;
  }
}
