import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
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

  async cargarDatosUsuario() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    
    if (usuarioActual && usuarioActual.email) {
      this.usuario = usuarioActual;
      this.esAdmin = usuarioActual.email === 'admin@example.com'; // Ajusta esto según tu lógica de admin
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