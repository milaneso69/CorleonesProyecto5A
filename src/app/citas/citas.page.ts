import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone:false
})
export class CitasPage implements OnInit {

  // Datos de horarios
  schedule = [
    { dayName: 'Lunes', hours: '10:00 AM - 8:30 PM' },
    { dayName: 'Martes', hours: '11:00 AM - 8:30 PM' },
    { dayName: 'Miércoles', hours: '11:00 AM - 8:30 PM' },
    { dayName: 'Jueves', hours: '10:30 AM - 8:30 PM' },
    { dayName: 'Viernes', hours: '10:00 AM - 8:30 PM' },
    { dayName: 'Sábado', hours: '10:00 AM - 8:30 PM' },
    { dayName: 'Domingo', hours: '11:00 AM - 2:00 PM' }
  ];

  // Días de la semana en español
  weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor() { }

  ngOnInit() {

    
  }

  // Verifica si es el día actual
  isCurrentDay(dayName: string): boolean {
    const today = new Date().getDay();
    return this.weekDays[today] === dayName;
  }

}
