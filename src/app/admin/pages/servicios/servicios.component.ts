import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator } from '../../../validations/validators';

interface Services {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-servicios',
  standalone: false,
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {
  
      services: Services[] = [];
      showAddModal = false;
      showEditModal = false;
      showDeleteModal = false;
      servicesForm!: FormGroup;
      currentServices: Services | null = null;

      constructor(private servicesService: ServicesService, private fb: FormBuilder) {}

      ngOnInit(): void {
        this.loadServices();
        this.initForm();
    }

    initForm(services?: Services) {
          this.servicesForm = this.fb.group({
            nombre: [services?.nombre || '', [Validators.required, Validators.maxLength(50), soloLetrasValidator()]],
            descripcion: [services?.descripcion || '', [Validators.required, Validators.maxLength(50), soloLetrasValidator()]],
            precio: [services?.precio || '', [Validators.required, soloNumerosValidator(10)]],
          });
        }

  // Usa la función para evitar la entrada de números
  onKeyPress(event: KeyboardEvent): boolean {
    return soloLetras(event);
  }

  soloNumeros(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
    if (charCode >= 48 && charCode <= 57) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  limitarLongitud(event: Event, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (data: Services[]) => {
        console.log('Datos recibidos:', data);
        this.services = data;
      },
      error: (error) => {
        console.error('Error al obtener servicios:', error);
        alert('Error al cargar servicios');
      },
    });
  }

  openAddModal() {
    this.initForm();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  private transformServiceData(data: any): any {
    return {
      Nombre: data.nombre, 
      Descripcion: data.descripcion,
      Precio: data.precio, 
    };
  }

  addServices() {
    if (this.servicesForm.valid) {
      const servicesData = this.transformServiceData(this.servicesForm.value); 
      this.servicesService.createServices(servicesData).subscribe({
        next: (response) => {
          console.log('Servicio creado:', response);
          this.loadServices();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error al crear servicio:', error);
          alert('Error al crear el servicio');
        },
      });
    } else {
      this.markFormGroupTouched(this.servicesForm);
    }
  }

        openEditModal(services: Services) {
          this.currentServices = services;
          this.initForm(services);
          this.showEditModal = true;
        }
      
        markFormGroupTouched(formGroup: FormGroup) {
          Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
          });
        }
  
        closeEditModal() {
          this.showEditModal = false;
          this.currentServices = null;
        }

        updateServices() {
          if (this.servicesForm.valid && this.currentServices) {
            const serviceData = this.transformServiceData(this.servicesForm.value); 
            this.servicesService
              .updateServices(this.currentServices.idservicio, serviceData)
              .subscribe({
                next: (response) => {
                  console.log('Servicio actualizado:', response);
                  this.loadServices();
                  this.closeEditModal();
                },
                error: (error) => {
                  console.error('Error al actualizar servicio:', error);
                  alert('Error al actualizar el servicio');
                },
              });
          } else {
            this.markFormGroupTouched(this.servicesForm);
          }
        }

        openDeleteModal(services: Services) {
          this.currentServices = services;
          this.showDeleteModal = true;
        }
      
        closeDeleteModal() {
          this.showDeleteModal = false;
          this.currentServices = null;
        }

        deleteServices() {
          if (this.currentServices) {
            this.servicesService.deleteServices(this.currentServices.idservicio).subscribe({
              next: (response) => {
                console.log('Servicio eliminado:', response);
                this.loadServices();
                this.closeDeleteModal();
              },
              error: (error) => {
                console.error('Error al eliminar servicio:', error);
                alert('Error al eliminar el servicio');
              },
            });
          }
        }
}
