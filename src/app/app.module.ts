import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { InicioComponent } from './admin/pages/inicio/inicio.component';
import { UsuariosComponent } from './admin/pages/usuarios/usuarios.component';
import { ClientesComponent } from './admin/pages/clientes/clientes.component';
import { FooterComponent } from './admin/template/footer/footer.component';
import { HeadermenuComponent } from './admin/template/headermenu/headermenu.component';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './admin/pages/empleados/empleados.component';
import { ServiciosComponent } from './admin/pages/servicios/servicios.component';
import { CitasComponent } from './admin/pages/citas/citas.component';
import { ProductosComponent } from './admin/pages/productos/productos.component';
import { VentasComponent } from './admin/pages/ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    ClientesComponent,
    FooterComponent,
    HeadermenuComponent,
    LandingComponent,
    EmpleadosComponent,
    ServiciosComponent,
    CitasComponent,
    ProductosComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
