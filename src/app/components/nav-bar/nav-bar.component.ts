import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuarioLogueado = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => {
      this.usuarioLogueado = !!usuario;
    });
  }
}

