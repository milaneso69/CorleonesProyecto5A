import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart, { ChartType } from 'chart.js/auto'

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.crearGrafica();
    }
  }

  crearGrafica(): void {
    setTimeout(() => { // Usar setTimeout para dar tiempo al DOM para cargar los elementos
      const ctx1 = document.getElementById('miGrafica1') as HTMLCanvasElement;
      const ctx2 = document.getElementById('miGrafica2') as HTMLCanvasElement;

      if (ctx1 && ctx2) {
        // Definir las gráficas
        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
              label: 'Ventas Mensuales',
              data: [65, 59, 80, 81, 56],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Agregar la segunda gráfica
        new Chart(ctx2, {
          type: 'line',
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
              label: 'Ventas Mensuales',
              data: [65, 59, 80, 81, 56],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }); // Espera un poco para asegurarse de que el canvas está disponible
  }
}
