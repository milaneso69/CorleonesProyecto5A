import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headermenu',
  standalone: false,
  templateUrl: './headermenu.component.html',
  styleUrl: './headermenu.component.css'
})
export class HeadermenuComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Obtener la página actual
      const currentPage = window.location.pathname.split("/").pop();
      const menuLinks = document.querySelectorAll("#sidebar .side-menu.top li a");

      // Añadir clase 'active' al enlace del menú correspondiente
      menuLinks.forEach(link => {
        const linkPage = link.getAttribute("routerLink")?.split("/").pop();
        if (linkPage === currentPage) {
          link.parentElement?.classList.add("active");
        }
      });

      // Disparar el evento personalizado 'menuLoaded'
      const event = new Event("menuLoaded");
      document.dispatchEvent(event);
    }
  }
}