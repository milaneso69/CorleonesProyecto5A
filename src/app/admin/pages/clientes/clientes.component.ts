import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator } from '../../../validations/validators';

interface Clients {
  idcliente: number;
  idusuario: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

    clients: Clients[] = [];
    showAddModal = false;
    showEditModal = false;
    showDeleteModal = false;
    clientsForm!: FormGroup;
    currentClients: Clients | null = null;

    constructor(private clientsService: ClientsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.loadClients();
        this.initForm();
    }

    initForm(clients?: Clients) {
      this.clientsForm = this.fb.group({
        idusuario: [clients?.idusuario || '', [Validators.required, soloNumerosValidator(10)]],
        nombre: [clients?.nombre || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        appaterno: [clients?.appaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        apmaterno: [clients?.apmaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        telefono: [clients?.telefono || '', [Validators.required, soloNumerosValidator(10)]],
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

    loadClients() {
      this.clientsService.getClients().subscribe({
        next: (data: Clients[]) => {
          console.log('Datos recibidos:', data);
          this.clients = data;
        },
        error: (error) => {
          console.error('Error al obtener clientes:', error);
          alert('Error al cargar clientes');
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
  
    private transformClientData(data: any): any {
      return {
        IdUsuario: data.idusuario,
        Nombre: data.nombre, 
        ApPaterno: data.appaterno,
        ApMaterno: data.apmaterno,
        Telefono: data.telefono, 
      };
    }

    addClients() {
      if (this.clientsForm.valid) {
        const clientData = this.transformClientData(this.clientsForm.value); 
        this.clientsService.createClients(clientData).subscribe({
          next: (response) => {
            console.log('Cliente creado:', response);
            this.loadClients();
            this.closeAddModal();
          },
          error: (error) => {
            console.error('Error al crear cliente:', error);
            alert('Error al crear el cliente');
          },
        });
      } else {
        this.markFormGroupTouched(this.clientsForm);
      }
    }

      openEditModal(clients: Clients) {
        this.currentClients = clients;
        this.initForm(clients);
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
        this.currentClients = null;
      }

      updateClients() {
        if (this.clientsForm.valid && this.currentClients) {
          const clientData = this.transformClientData(this.clientsForm.value); 
          this.clientsService
            .updateClients(this.currentClients.idcliente, clientData)
            .subscribe({
              next: (response) => {
                console.log('Cliente actualizado:', response);
                this.loadClients();
                this.closeEditModal();
              },
              error: (error) => {
                console.error('Error al actualizar cliente:', error);
                alert('Error al actualizar el cliente');
              },
            });
        } else {
          this.markFormGroupTouched(this.clientsForm);
        }
      }

      openDeleteModal(clients: Clients) {
        this.currentClients = clients;
        this.showDeleteModal = true;
      }
    
      closeDeleteModal() {
        this.showDeleteModal = false;
        this.currentClients = null;
      }
    
      deleteClients() {
        if (this.currentClients) {
          this.clientsService.deleteClients(this.currentClients.idcliente).subscribe({
            next: (response) => {
              console.log('Cliente eliminado:', response);
              this.loadClients();
              this.closeDeleteModal();
            },
            error: (error) => {
              console.error('Error al eliminar cliente:', error);
              alert('Error al eliminar el cliente');
            },
          });
        }
      }
}
