import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  searchText = ''; // Texto del buscador

  // Lista de servicios 
  servicios = [
    { id: 101, nombre: 'Mullet', descripcion: 'Desvanecido de patillas y shaver en patillas.', precio: 130, imagen: 'assets/icon/mullet.jpeg' },
    { id: 102, nombre: 'High Fade', descripcion: 'Desvanecido alto desde shaver.', precio: 130, imagen: 'assets/icon/High Fade.jpg' },
    { id: 103, nombre: 'Low Fade', descripcion: 'Desvanecido bajo desde shaver.', precio: 130, imagen: 'assets/icon/LowFade.jpeg' },
    { id: 104, nombre: 'Low Fade en V', descripcion: 'Desvanecido bajo en V desde shaver.', precio: 130, imagen: 'assets/icon/Low Fade V.jpg' },
    { id: 105, nombre: 'Tapper Fade', descripcion: 'Desvanecido de patillas y contorno de atrás.', precio: 130, imagen: 'assets/icon/TaperFade.jpeg' }
  ];

  // Lista de productos 
  productos = [
    { id: 1, nombre: 'Cera Original', descripcion: 'Cera para cabello.', precio: 100, imagen: 'assets/icon/CeraOriginal.webp' },
    { id: 2, nombre: 'Cera Strong', descripcion: 'Cera para el cabello.', precio: 120, imagen: 'assets/icon/CeraBuffaloStrongMatte.jpeg' },
    { id: 3, nombre: 'Cera Matte', descripcion: 'Cera para el cabello.', precio: 150, imagen: 'assets/icon/CeraMate.webp' },
    { id: 4, nombre: 'Cera Black', descripcion: 'Cera para el cabello.', precio: 150, imagen: 'assets/icon/CeraBlack.jpg' }
  ];

  // Listas filtradas
  filteredServicios = [...this.servicios];
  filteredProductos = [...this.productos];

  constructor(private navCtrl: NavController) {}

  // Método para filtrar productos y servicios
  filterItems() {
    const searchText = this.searchText.toLowerCase();

    // Filtrar servicios
    this.filteredServicios = this.servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(searchText)
    );

    // Filtrar productos
    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchText)
    );
  }

  // Agregar producto al carrito y guardarlo en localStorage
  addToCart(producto: any) {
    let cart = JSON.parse(localStorage.getItem('carrito') || '[]');

    let existingItem = cart.find((item: any) => item.id === producto.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...producto, quantity: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(cart));
  }

  // Ir al carrito
  goToCart() {
    this.navCtrl.navigateForward('/carrito');
  }

  // Agendar cita
  agendarCita() {
    this.navCtrl.navigateForward('/citas');
  }
}
