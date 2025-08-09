import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';           
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,                                  
  imports: [FormsModule],                            
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email = '';
  contrasena = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.contrasena).subscribe(success => {
      if (success) {
        this.router.navigate(['/empleados']);
      } else {
        this.error = 'Email o contraseña incorrectos.';
      }
    });
  }
}
