import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../auth/services/appointments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator, dominioEspecificoValidator } from '../../../validations/validators';

interface Appointments {
  idcita: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo: string;
  telefono: number;
  servicio: string;
  fechaagendada: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-citas',
  standalone: false,
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

        appointments: Appointments[] = [];
        showAddModal = false;
        showEditModal = false;
        showDeleteModal = false;
        appointmentsForm!: FormGroup;
        currentAppointments: Appointments | null = null;

        constructor(private appointmentsService: AppointmentsService, private fb: FormBuilder) {}

        ngOnInit(): void {
          this.loadAppointments();
          this.initForm();
      }

     initForm(appointments?: Appointments) {
               this.appointmentsForm = this.fb.group({
                nombre: [appointments?.nombre || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
                appaterno: [appointments?.appaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
                apmaterno: [appointments?.apmaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
                correo: [appointments?.correo || '', [Validators.required, Validators.email, Validators.maxLength(60) , dominioEspecificoValidator('@gmail.com')]],
                telefono: [appointments?.telefono || '', [Validators.required, soloNumerosValidator(10)]],
                servicio: [appointments?.nombre || '', [Validators.required, Validators.maxLength(50), soloLetrasValidator()]],
                fechaagendada: [appointments?.fechaagendada || '', [Validators.required, Validators.maxLength(20)]],
               });
             }

      validarCorreo(): void {
      const correoControl = this.appointmentsForm.get('correo');
      if (correoControl?.invalid) {
        console.log('Correo inválido');
      } else {
        console.log('Correo válido');
      }
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
  
  loadAppointments() {
    this.appointmentsService.getAppointments().subscribe({
      next: (data: Appointments[]) => {
        console.log('Datos recibidos:', data);
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error al obtener citas:', error);
        alert('Error al cargar citas');
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

  private transformAppointmentData(data: any): any {
    return {
      Nombre: data.nombre, 
      ApPaterno: data.appaterno,
      ApMaterno: data.apmaterno,
      Correo: data.correo,
      Telefono: data.telefono, 
      Servicio: data.servicio, 
      FechaAgendada: data.fechaagendada,
    };
  }

  addAppointments() {
    if (this.appointmentsForm.valid) {
      const appointmentData = this.transformAppointmentData(this.appointmentsForm.value); 
      this.appointmentsService.createAppointments(appointmentData).subscribe({
        next: (response) => {
          console.log('Cita creado:', response);
          this.loadAppointments();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error al crear cita:', error);
          alert('Error al crear el cita');
        },
      });
    } else {
      this.markFormGroupTouched(this.appointmentsForm);
    }
  }

  openEditModal(appointments: Appointments) {
            this.currentAppointments = appointments;
            this.initForm(appointments);
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
            this.currentAppointments = null;
          }

  updateAppointments() {
          if (this.appointmentsForm.valid && this.currentAppointments) {
            const appointmentData = this.transformAppointmentData(this.appointmentsForm.value); 
            this.appointmentsService
              .updateAppointments(this.currentAppointments.idcita, appointmentData)
              .subscribe({
                next: (response) => {
                  console.log('Cita actualizado:', response);
                  this.loadAppointments();
                  this.closeEditModal();
                },
                error: (error) => {
                  console.error('Error al actualizar cita:', error);
                  alert('Error al actualizar la cita');
                },
              });
          } else {
            this.markFormGroupTouched(this.appointmentsForm);
          }
        }

        openDeleteModal(appointments: Appointments) {
          this.currentAppointments = appointments;
          this.showDeleteModal = true;
        }
      
        closeDeleteModal() {
          this.showDeleteModal = false;
          this.currentAppointments = null;
        }

        deleteAppointments() {
          if (this.currentAppointments) {
            this.appointmentsService.deleteAppointments(this.currentAppointments.idcita).subscribe({
              next: (response) => {
                console.log('Cita eliminado:', response);
                this.loadAppointments();
                this.closeDeleteModal();
              },
              error: (error) => {
                console.error('Error al eliminar cita:', error);
                alert('Error al eliminar la cita');
              },
            });
          }
        }
}
