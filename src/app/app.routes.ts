import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'empleados', component: EmpleadosComponent },
    {path: '',redirectTo: '/home', pathMatch: 'full'}
    
];
