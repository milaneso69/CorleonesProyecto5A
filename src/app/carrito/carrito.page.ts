import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.loadCart();
  }

  // Cargar el carrito desde localStorage
  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.updateTotal();
  }

  // Actualizar el total del carrito
  updateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  }

  // Eliminar un producto del carrito
  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('carrito', JSON.stringify(this.cartItems));
    this.updateTotal();
  }

  // Vaciar el carrito
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('carrito');
    this.updateTotal();
  }

  // Volver al catálogo
  goBack() {
    this.navCtrl.navigateBack('/tabs/tab2'); // Asegúrate de que el catálogo esté en `/tabs/tab2`
  }
  // Comprar
  checkout() {
    alert('Compra realizada con éxito');
    this.clearCart();
  } 
}

