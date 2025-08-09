// src/app/guardianes/proteger-empleados.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProtegerEmpleadosGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/iniciarSesion']);
      return false;
    }
  }
}
