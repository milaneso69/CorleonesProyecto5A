import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular'; // Nombre correcto de la interfaz

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit, ViewWillEnter {
  usuario: any = {
    nombre: '',
    email: '',
    telefono: ''
  };
  esAdmin: boolean = false;

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  ionViewWillEnter() {
    // Esto se ejecutará cada vez que la página esté a punto de mostrarse
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    
    if (usuarioActual && usuarioActual.email) {
      this.usuario = {
        nombre: usuarioActual.nombre || '',
        email: usuarioActual.email || '',
        telefono: usuarioActual.telefono || ''
      };
      this.esAdmin = usuarioActual.email.toLowerCase() === 'admin@example.com';
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Sesión no iniciada',
        message: 'Por favor inicia sesión para ver tu perfil',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
    }
  }

  async cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    const alert = await this.alertCtrl.create({
      header: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/login']);
  }
}