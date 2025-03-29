import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  async guardarDatos() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;
      
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      const existeUsuario = usuarios.some((u: any) => u.email === usuario.email);
      
      if (existeUsuario) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Este correo electrónico ya está registrado.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
      
      // Agregar nuevo usuario con todos los campos necesarios
      usuarios.push({
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        telefono: usuario.telefono
      });
      
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido creada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      
      this.router.navigate(['/login']);
    }
  }
}