import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../auth/services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator, dominioEspecificoValidator } from '../../../validations/validators';

interface Employees {
  idempleado: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  nss: number;
  rfc: string;
  correo: string;
  contrasenia: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-empleados',
  standalone: false,
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  employees: Employees[] = [];
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  employeesForm!: FormGroup;
  currentEmployees: Employees | null = null;

  constructor(private employeesService: EmployeesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.initForm();
}

    initForm(employees?: Employees) {
      this.employeesForm = this.fb.group({
        nombre: [employees?.nombre || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        appaterno: [employees?.appaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        apmaterno: [employees?.apmaterno || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
        telefono: [employees?.telefono || '', [Validators.required, soloNumerosValidator(10)]],
        nss: [employees?.nss || '', [Validators.required, soloNumerosValidator(11)]],
        rfc: [employees?.rfc || '', [Validators.required, Validators.maxLength(13)]],
        correo: [employees?.correo || '', [Validators.required, Validators.email, Validators.maxLength(60) , dominioEspecificoValidator('@gmail.com')]],
        contrasenia: [employees?.contrasenia || '', [Validators.required, Validators.maxLength(255)]],
      });
    }

    validarCorreo(): void {
      const correoControl = this.employeesForm.get('correo');
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

  loadEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (data: Employees[]) => {
        console.log('Datos recibidos:', data);
        this.employees = data;
      },
      error: (error) => {
        console.error('Error al obtener empleados:', error);
        alert('Error al cargar empleados');
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

  private transformEmployeeData(data: any): any {
    return {
      Nombre: data.nombre, 
      ApPaterno: data.appaterno,
      ApMaterno: data.apmaterno,
      Telefono: data.telefono,
      NSS: data.nss,
      RFC: data.rfc, 
      Correo: data.correo, 
      Contrasenia: data.contrasenia,
    };
  }

  addEmployees() {
    if (this.employeesForm.valid) {
      const employeeData = this.transformEmployeeData(this.employeesForm.value); 
      this.employeesService.createEmployees(employeeData).subscribe({
        next: (response) => {
          console.log('Empleado creado:', response);
          this.loadEmployees();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error al crear empleado:', error);
          alert('Error al crear el empleado');
        },
      });
    } else {
      this.markFormGroupTouched(this.employeesForm);
    }
  }

        openEditModal(employees: Employees) {
          this.currentEmployees = employees;
          this.initForm(employees);
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
          this.currentEmployees = null;
        }

        updateEmployees() {
          if (this.employeesForm.valid && this.currentEmployees) {
            const employeeData = this.transformEmployeeData(this.employeesForm.value); 
            this.employeesService
              .updateEmployees(this.currentEmployees.idempleado, employeeData)
              .subscribe({
                next: (response) => {
                  console.log('Empleado actualizado:', response);
                  this.loadEmployees();
                  this.closeEditModal();
                },
                error: (error) => {
                  console.error('Error al actualizar empleado:', error);
                  alert('Error al actualizar el empleado');
                },
              });
          } else {
            this.markFormGroupTouched(this.employeesForm);
          }
        }

        openDeleteModal(employees: Employees) {
          this.currentEmployees = employees;
          this.showDeleteModal = true;
        }
      
        closeDeleteModal() {
          this.showDeleteModal = false;
          this.currentEmployees = null;
        }

        deleteEmployees() {
          if (this.currentEmployees) {
            this.employeesService.deleteEmployees(this.currentEmployees.idempleado).subscribe({
              next: (response) => {
                console.log('Empleado eliminado:', response);
                this.loadEmployees();
                this.closeDeleteModal();
              },
              error: (error) => {
                console.error('Error al eliminar empleado:', error);
                alert('Error al eliminar el empleado');
              },
            });
          }
        }
}
