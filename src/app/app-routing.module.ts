import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadermenuComponent } from './admin/template/headermenu/headermenu.component';
import { InicioComponent } from './admin/pages/inicio/inicio.component';
import { UsuariosComponent } from './admin/pages/usuarios/usuarios.component';
import { ClientesComponent } from './admin/pages/clientes/clientes.component';
import { EmpleadosComponent } from './admin/pages/empleados/empleados.component';
import { ServiciosComponent } from './admin/pages/servicios/servicios.component';
import { CitasComponent } from './admin/pages/citas/citas.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { ProductosComponent } from './admin/pages/productos/productos.component';
import { VentasComponent } from './admin/pages/ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'headermenu',
    component: HeadermenuComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
  },
  {
    path: 'citas',
    component: CitasComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'ventas',
    component: VentasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
