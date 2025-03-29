import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';  // ✅ Importa el componente standalone

const routes: Routes = [
  {
    path: '',
    component: LoginPage  // ✅ Lo usas directamente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
