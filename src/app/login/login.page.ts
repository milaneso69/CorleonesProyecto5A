import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading: boolean = false; // Para controlar estado de carga

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getLocalStorageItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  async ingresar() {
    this.isLoading = true;
    
    try {
      const usuarios = this.getLocalStorageItem('usuarios') || [];
      
      const usuarioValido = usuarios.find((u: any) => 
        u.email === this.email && u.password === this.password
      );
  
      if (usuarioValido) {
        // Guardar usuario en localStorage con la clave CORRECTA
        this.setLocalStorageItem('usuarioActual', usuarioValido);
        
        await this.mostrarAlerta('Bienvenido', `Hola ${usuarioValido.nombre}!`);
        this.router.navigate(['/tabs/tab1']); // Redirige a las tabs
      } else {
        await this.mostrarAlerta('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un problema al iniciar sesión');
    } finally {
      this.isLoading = false;
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  
}