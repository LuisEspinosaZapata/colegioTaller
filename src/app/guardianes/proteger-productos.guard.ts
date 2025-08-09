import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProtegerProductosGuard implements CanMatch {

  constructor(private authService: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/iniciarSesion']);
      return false;
    }
  }
}
